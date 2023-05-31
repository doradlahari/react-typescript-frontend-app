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
      .post("http://localhost:5000/forgotpassword", payload)
      .then((res) => {
        if (res.data === "user not found") {
          message.error("User not found");
        } else {
          console.log(res.data);
          localStorage.setItem("email", formData.email);
          const userId = res.data.userId; // Update this line to match the actual path of userId in the server response
          navigate(`/resetpassword/${userId}`); // Include the userId parameter in the URL
          message.success("reset link send to email");
        }
      })
      .catch(() => {
        message.error("Something went wrong, please try again");
      });
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
            autoComplete="on"
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
