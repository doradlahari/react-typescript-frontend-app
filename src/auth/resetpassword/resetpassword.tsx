import React, { useState } from "react";
import { Form, Input, Button, Col, Row, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPasswordForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const Navigation = () => {
    navigate("/");
  };

  interface FormData {
    password: string;
    conformpassword: string;
  }

  const [formData, setFormData] = useState<FormData>({
    password: "",
    conformpassword: "",
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
      password: formData.password,
      conformPassword: formData.conformpassword,
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
            name="conformpassword"
            value={formData.conformpassword}
            onChange={handleChange}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
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
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                onClick={Navigation}
              >
                Reset Password
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
