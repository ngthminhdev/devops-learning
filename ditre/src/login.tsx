import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row, Typography, message } from "antd";
import "./App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Text, Title, Link } = Typography;

const Login = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    try {
      const response = await axios.post("http://api.localhost/api/login", {
        username: values.username,
        password: values.password,
      });

      if (response.data && response.data.token) {
        // Lưu token vào local storage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        message.success("Login success");
        navigate("/");
      } else {
        message.error("Login failed: No token received.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Login error: ", error);
      message.error(
        "Login failed: " + (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <Row className="section">
      <div className="container">
        <div className="header">
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0.464294" width="24" height="24" rx="4.8" fill="#1890FF" />
            <path
              d="M14.8643 3.6001H20.8643V9.6001H14.8643V3.6001Z"
              fill="white"
            />
            <path
              d="M10.0643 9.6001H14.8643V14.4001H10.0643V9.6001Z"
              fill="white"
            />
            <path
              d="M4.06427 13.2001H11.2643V20.4001H4.06427V13.2001Z"
              fill="white"
            />
          </svg>

          <Title className="title">Sign in</Title>
          <Text className="text">
            Welcome back to TEAM03 ! Please enter your details below to sign in.
          </Text>
        </div>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="username"
            rules={[
              {
                type: "string",
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
            <div className="footer">
              <Text className="text">Don't have an account?</Text>{" "}
              <Link href="register">Sign up now</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Row>
  );
};
export default Login;
