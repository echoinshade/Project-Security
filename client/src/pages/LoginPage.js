import React from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Отправляемые данные:", values); // Логируем отправляемые данные
    try {
      const response = await fetch("https://site04.sibinfo.ru/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
  
      console.log("Статус ответа:", response.status); // Логируем статус ответа
  
      const data = await response.json();
      console.log("Ответ от сервера:", data); // Логируем ответ от сервера
  
      if (response.ok) {
        message.success("Вход успешен!");
        if (data.role_id === 1) {
          navigate("/admin");
        } else if (data.role_id === 2) {
          navigate("/visit-log");
        } else {
          navigate("/profile");
        }
      } else {
        message.error(data.message);
      }
    } catch (error) {
      console.error("Ошибка при входе:", error);
      message.error("Ошибка сервера");
    }
  };
  

  return (
    <Form name="login" layout="vertical" onFinish={onFinish}>
      <Form.Item name="email" label="Email" rules={[{ required: true, message: "Введите email" }]}>
        <Input />
      </Form.Item>

      <Form.Item name="password" label="Пароль" rules={[{ required: true, message: "Введите пароль" }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>Войти</Button>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;
