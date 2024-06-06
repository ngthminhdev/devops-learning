import { Button, Input, Image, message } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import timeBg from "./assets/time.jpeg";
import "./App.css"; // Create and import a CSS file for styling

const Home = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [minutesLate, setMinutesLate] = useState(""); // State để lưu giá trị input
  const [username, setUsername] = useState(""); // State để lưu username

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const getMyDay = (day: number) => {
    const d = day + 1;
    return d < 10 ? "0" + d : d;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getMyH = (h: any) => {
    return h < 10 ? "0" + h : h;
  };

  const d = dateTime;
  const y = d.getFullYear();
  const date = d.getDate();
  const m = d.getMonth();
  const dayInW = d.getDay();
  const h = d.getHours();
  const mi = d.getMinutes();
  const s = d.getSeconds();

  const handleSubmit = async () => {
    if (!username) {
      message.error("Username not found in local storage");
      return;
    }

    try {
      const response = await axios.post("http://api.localhost/api/di-tre", {
        username,
        time: minutesLate,
      });
      console.log(response);
      message.success("Data submitted successfully");
    } catch (error) {
      console.error("Error submitting data: ", error);
      message.error("Failed to submit data");
    }
  };

  return (
    <>
      <div className="box-time">
        <div className="day">
          Thứ {getMyDay(dayInW)} ngày {date} tháng {getMyDay(m)} năm {y}
        </div>
        <div className="hour">
          {getMyH(h)} : {getMyH(mi)} : {getMyH(s)}
        </div>
        <div className="info">
          <div>Tên nhân viên: {username || "N/A"}</div>
          <div>Mã nhân viên: SC00001</div>
        </div>
        <div className="form">
          <Input
            placeholder="Số phút"
            value={minutesLate}
            onChange={(e) => setMinutesLate(e.target.value)}
          />
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
        <div className="image-time">
          <Image
            // src="./../src/assets/time.png"
            src={timeBg}
            height={250}
            width={700}
            preview={false}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
