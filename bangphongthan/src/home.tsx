import type { TableProps } from "antd";
import { Table } from "antd";

interface DataType {
  stt: string;
  code: string;
  name: string;
  count: number;
}

const Home = () => {
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Mã nhân viên",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Tên nhân viên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số phút đi trễ",
      dataIndex: "count",
      key: "count",
      render: (value) => <div>{value} phút</div>,
    },
  ];

  const data: DataType[] = [
    {
      stt: "1",
      code: "SC000001",
      name: "Nguyễn Văn A",
      count: 100
    },
  ];
  return <div className="box-main">
    <div className="title">BẢNG XẾP HẠNG ĐI TRỄ</div>
    <Table columns={columns} dataSource={data} bordered />

  </div>
};
export default Home;
