import React, { useState } from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import axios from "axios";
import "../forgotpassword/forgotpassword.css";
const Forgotpassword = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const payload = {
      email: formData.email,
      password: formData.password,
    };
    axios
      .post("http://localhost:5000/loginuser", payload)
      .then((res) => {
        if (res.data === "user not found") {
          message.error("User not found");
        } else if (res.data === "invalid credentails") {
          message.error("Invalid credentials");
        } else {
          console.log(res.data);
          localStorage.setItem("email", formData.email);
          message.success("login sucessfull!");
        }
      })
      .catch(() => {
        message.error("something went wrong please try again");
      });
    console.log("Login clicked");
  };

  return (
    <div>
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
        </Form.Item>
      </Form>
    </div>
  );
};

export default Forgotpassword;
