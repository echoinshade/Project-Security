import React, { useState } from "react";
import { Card, Button } from "antd";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import { useNavigate } from "react-router-dom";

const LoginRegisterPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  // 🔥 Передаём функцию для успешного логина
  const handleLoginSuccess = () => {
    navigate("/admin"); // 🚀 Перенаправление на страницу администратора
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f0f2f5" }}>
      <Card style={{ width: 400 }}>
        {isRegister ? <RegisterPage /> : <LoginPage onLoginSuccess={handleLoginSuccess} />}
        
        <Button type="link" onClick={() => setIsRegister(!isRegister)} style={{ marginTop: 10 }}>
          {isRegister ? "Уже есть аккаунт? Войти" : "Нет аккаунта? Зарегистрироваться"}
        </Button>
      </Card>
    </div>
  );
};

export default LoginRegisterPage;
