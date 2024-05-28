const express = require("express");
const bodyParser = require("body-parser");
const mariadb = require("mariadb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const port = 3000;
const secretKey = "team3-secret-key";
const corsOptions = {
  origin: "http://0.0.0.0",
  // optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const pool = mariadb.createPool({
  host: "db",
  user: "root",
  password: "team3",
  database: "team3",
});

app.use(bodyParser.json());

async function initializeDatabase() {
  let conn;
  let isConnected = false;
  let tried = 1;
  const maxTry = 10;

  try {
    while (tried < maxTry && !isConnected) {
      conn = await pool.getConnection();
      await conn.query("CREATE DATABASE IF NOT EXISTS team3");
      await conn.query("USE team3");
      await conn.query(`CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    )`);
      console.info("Created table team3.users!");
      isConnected = true;
    }
  } catch (err) {
    tried++;
    console.error(`Error initializing database ${tried} times:`, err);
  }
}

// API Register
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const conn = await pool.getConnection();
    const result = await conn.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashedPassword]
    );
    conn.release();
    res.status(201).json({
      message: "User registered",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error registered",
    });
  }
});

// API Login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    conn.release();

    if (rows.length === 0) {
      return res.status(400).send("Invalid username or password");
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error logging in" });
  }
});

// API Index (protected route)
app.get("/api/welcome", (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    res.status(200).json({ message: "Welcome to the index page" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Invalid token" });
  }
});

app.listen(port, async () => {
  await initializeDatabase();
  console.log(`Server running on port ${port}`);
});
