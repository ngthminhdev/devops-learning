import { Button, Input, Image } from "antd";
import { useEffect, useState } from "react";
import timeBg from "./assets/time.jpeg";
import "./App.css"; // Create and import a CSS file for styling

const Home = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
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
          <div>Tên nhân viên: Minh Dev</div>
          <div>Mã nhân viên: SC00001</div>
        </div>
        <div className="form">
          {" "}
          <Input placeholder="Số phút" />
          <Button type="primary" htmlType="submit">
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
