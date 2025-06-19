import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  useEffect(() => {
    document.title = "Логин | sibinfo";
  }, []);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Отправляемые данные:", values); // Логируем отправляемые данные
    try {
      const response = await fetch("/server/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      console.log("Статус ответа:", response.status); // Логируем статус ответа

      let data;
      try {
        data = await response.json(); // напрямую парсим JSON
      } catch (error) {
        console.error("Ошибка при разборе JSON:", error);
        const text = await response.text();
        console.log("Ответ текстом:", text);
        message.error("Некорректный ответ от сервера");
        return;
      }
  
      console.log("Ответ от сервера:", data); // Логируем распарсенный JSON
      console.log("Тип role_id:", typeof data.role_id, "Значение:", data.role_id); // Добавляем логирование role_id
      
      if (response.ok) {
        message.success("Вход успешен!");
        const roleId = Number(data.role_id);
        const userId = data.userId;
        console.log("Преобразованный roleId:", roleId, "userId:", userId);

        // Сохраняем userId в localStorage
        localStorage.setItem("userId", userId);
        console.log("Преобразованный roleId:", roleId);
        if (roleId === 1) {
          console.log("Перенаправление в админку");
          navigate("/admin");
        } else if (roleId === 2) {
          console.log("Перенаправление в журнал посещений");
          navigate("/visit-log");
        } else {
          console.log("Перенаправление в профиль (значение role_id:", roleId, ")");
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
