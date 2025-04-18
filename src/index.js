import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons/lib/icons";

const LoginPage = () => {
  const onFinish = (values) => {
    console.log("Received values: ", values);
    message.success("Авторизация успешна!");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f0f2f5" }}>
      <Card title="Авторизация" style={{ width: 300 }}>
        <Form name="login_form" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: "Введите имя пользователя!" }]}>            
            <Input prefix={<UserOutlined />} placeholder="Имя пользователя" />
          </Form.Item>
          
          <Form.Item name="password" rules={[{ required: true, message: "Введите пароль!" }]}>            
            <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Войти
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
