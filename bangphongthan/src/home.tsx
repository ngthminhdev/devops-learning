import type { TableProps } from "antd";
import { Table, message } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

interface DataType {
  stt: string;
  name: string;
  time: number;
}

const Home = () => {
  const [data, setData] = useState<DataType[]>([]);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tên nhân viên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số phút đi trễ",
      dataIndex: "time",
      key: "time",
      render: (value) => <div>{value} phút</div>,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://api.localhost/api/list");
        const apiData = response.data.data.map(
          (item: { username: string; time: number }, index: number) => ({
            stt: (index + 1).toString(),
            name: item.username,
            time: item.time,
          })
        );
        setData(apiData);
      } catch (error) {
        console.error("Error fetching data: ", error);
        message.error("Failed to fetch data from API");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="box-main">
      <div className="title">BẢNG XẾP HẠNG ĐI TRỄ</div>
      <Table columns={columns} dataSource={data} bordered rowKey="stt" />
    </div>
  );
};

export default Home;
