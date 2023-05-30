import React, { useState } from "react";
import { Form, Input, Button, Col, Row, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const Navigation = () => {
    navigate("/");
  };

  interface FormData {
    firstname: string;
    lastname: string;
    email: string;
    mobileNumber: string;
    password: string;
    confirmpassword: string;
  }

  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onFinish = () => {
    let payload = {
      firstName: formData.firstname,
      lastName: formData.lastname,
      email: formData.email,
      mobileNumber: formData.mobileNumber,
      password: formData.password,
      confirmPassword: formData.confirmpassword,
    };

    axios
      .post("http://localhost:5000/createuser", payload)
      .then((res) => {
        if (res.data === "user already exists") {
          message.error("User already exists");
        } else {
          console.log(res.data);
          message.success("Registration successful");
          navigate("/verification");
        }
      })
      .catch(() => {
        message.error("Registration failed");
      });

    // Perform signup logic here
  };

  return (
    <div className="container">
      <Form
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        className="login-form-styles"
      >
        <Form.Item
          name="firstname"
          rules={[
            { required: true, message: "Please input your first name!" },
            {
              min: 4,
              message: "First name must be at least 4 characters long!",
            },
          ]}
          hasFeedback
        >
          <Input
            size="large"
            placeholder="Enter first name"
            name="firstname"
            autoFocus
            value={formData.firstname}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          name="lastname"
          rules={[
            { required: true, message: "Please input your last name!" },
            {
              min: 4,
              message: "Last name must be at least 4 characters long!",
            },
          ]}
          hasFeedback
        >
          <Input
            size="large"
            placeholder="Enter last name"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Enter your email!",
            },
            { whitespace: true },
            { type: "email", message: "Please enter a valid email" },
          ]}
          hasFeedback
        >
          <Input
            size="large"
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          name="mobileNumber"
          rules={[
            {
              required: true,
              message: "Enter your phone number!",
            },
            { whitespace: true },
            { min: 10, message: "Number must be 10 digits" },
            {
              pattern: new RegExp(/^[6-9]\d{9}$/),
              message: "Enter a valid number",
            },
          ]}
          hasFeedback
        >
          <Input
            size="large"
            name="mobileNumber"
            placeholder="Phone Number"
            value={formData.mobileNumber}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
          hasFeedback
        >
          <Input.Password
            size="large"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item
          name="confirmpassword"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            size="large"
            placeholder="Verify password"
            name="confirmpassword"
            value={formData.confirmpassword}
            onChange={handleChange}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item>
          <Row>
            <Col
              span={12}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                onClick={Navigation}
              >
                Login
              </Button>
            </Col>
            <Col
              span={12}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button type="primary" htmlType="submit" size="large">
                Sign Up
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignupForm;
