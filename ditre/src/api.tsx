import axios from "axios";

const axiosKDB = axios.create({
  baseURL: "http://api.localhost/api",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

export default axiosKDB;
