import React, { useEffect, useState } from "react";
import { Card, Button, Descriptions, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
  useEffect(() => {
    document.title = "Профиль | sibinfo";
  }, []);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ID пользователя (в реальности можно брать из токена, localStorage и т.п.)
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`/server/api/profile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }, })
      .then((res) => {
        console.log("Ответ сервера:", res.data); 
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка при загрузке профиля:", err);
        message.error("Не удалось загрузить данные пользователя");
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    message.success("Вы вышли из системы");
    navigate("/login");
  };

  if (loading) return <Spin style={{ marginTop: 100, display: 'block' }} />;

  if (!user) return null;

  return (
    <div style={{ maxWidth: 600, margin: "50px auto", padding: "20px" }}>
      <Card title="Личный кабинет" bordered={false}>
        <Descriptions column={1} bordered>
          <Descriptions.Item label="ФИО">{user.full_name}</Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Уровень доступа">{user.access_level}</Descriptions.Item>
          <Descriptions.Item label="Номер пропуска в ДК">
            {user.passport_series} {user.passport_number}
          </Descriptions.Item>
          <Descriptions.Item label="Код подразделения">{user.department_code}</Descriptions.Item>
          <Descriptions.Item label="Кем выдан">{user.issued_by}</Descriptions.Item>
          <Descriptions.Item label="Дата выдачи">{user.issue_date}</Descriptions.Item>
        </Descriptions>

        <Button type="primary" danger onClick={handleLogout} style={{ marginTop: 20 }}>
          Выйти
        </Button>
      </Card>
    </div>
  );
};

export default ProfilePage;


