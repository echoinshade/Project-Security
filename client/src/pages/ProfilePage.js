import React from "react";
import { Card, Button, Descriptions, message } from "antd";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();

  // Данные пользователя (можно подтягивать из API или локального хранилища)
  const user = {
    fullName: "Иванов Иван Иванович",
    email: "ivanov@example.com",
    accessLevel: "Администратор",
    passportSeries: "4510",
    passportNumber: "123456",
    departmentCode: "770-001",
    issuedBy: "ГУ МВД России",
    issueDate: "10.02.2015",
  };

  // Функция выхода из аккаунта
  const handleLogout = () => {
    message.success("Вы вышли из системы");
    navigate("/login"); // Перенаправление на страницу логина
  };

  return (
    <div style={{ maxWidth: 600, margin: "50px auto", padding: "20px" }}>
      <Card title="Личный кабинет" bordered={false}>
        <Descriptions column={1} bordered>
          <Descriptions.Item label="ФИО">{user.fullName}</Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Уровень доступа">{user.accessLevel}</Descriptions.Item>
          <Descriptions.Item label="Паспортные данные">
            {user.passportSeries} {user.passportNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Код подразделения">{user.departmentCode}</Descriptions.Item>
          <Descriptions.Item label="Кем выдан">{user.issuedBy}</Descriptions.Item>
          <Descriptions.Item label="Дата выдачи">{user.issueDate}</Descriptions.Item>
        </Descriptions>
        
        <Button type="primary" danger onClick={handleLogout} style={{ marginTop: 20 }}>
          Выйти
        </Button>
      </Card>
    </div>
  );
};

export default ProfilePage;

