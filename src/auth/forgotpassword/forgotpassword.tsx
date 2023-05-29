import React, { useState } from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../forgotpassword/forgotpassword.css";

const Forgotpassword: React.FC = () => {
  const [form] = Form.useForm();

  interface FormData {
    email: string;
  }

  const [formData, setFormData] = useState<FormData>({
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const routeTo = () => {
    navigate("/");
  };

  const handleSubmit = () => {
    const payload = {
      email: formData.email,
    };

    axios
      .post("http://localhost:5000/loginuser", payload)
      .then((res) => {
        if (res.data === "user not found") {
          message.error("User not found");
        } else if (res.data === "invalid credentials") {
          message.error("Invalid credentials");
        } else {
          console.log(res.data);
          localStorage.setItem("email", formData.email);
          message.success("Login successful!");
        }
      })
      .catch(() => {
        message.error("Something went wrong, please try again");
      });

    console.log("Login clicked");
  };

  return (
    <div className="container">
      <Form
        form={form}
        name="control-hooks"
        onFinish={handleSubmit}
        className="forgotpassword-form-styles"
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <Input
            autoComplete="off"
            size="large"
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            autoFocus
          />
        </Form.Item>

        <Form.Item>
          <Row>
            <Col
              span={24}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button type="primary" htmlType="submit" size="large">
                Forgot Password
              </Button>
            </Col>
          </Row>

          <Row>
            <Col
              span={24}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                type="link"
                htmlType="submit"
                size="large"
                onClick={routeTo}
              >
                Login
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Forgotpassword;
