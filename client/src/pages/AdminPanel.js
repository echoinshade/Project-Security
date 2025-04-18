import React, { useState } from "react";
import { Layout, Menu, Table, Typography, Button, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LogoutOutlined, TeamOutlined, FileTextOutlined, IdcardOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;
const { Title } = Typography;

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("visit-log"); // Переключение между страницами

  // Данные журнала посещений (заглушка)
  const visitData = [
    { key: "1", user: "Иван Петров", date: "2025-03-08 10:15", security: "Андреев В.А." },
    { key: "2", user: "Мария Сидорова", date: "2025-03-08 10:30", security: "Павлов С.Н." },
  ];

  // Данные управления охранниками (готово к MySQL)
  const securityData = [
    { key: "1", id: "101", name: "Андреев В.А.", date: "2023-06-12", access: "Высокий", status: "Активен" },
    { key: "2", id: "102", name: "Павлов С.Н.", date: "2024-01-25", access: "Средний", status: "Активен" },
    { key: "3", id: "103", name: "Кузнецов И.Д.", date: "2022-11-10", access: "Низкий", status: "Неактивен" },
  ];

  // Меню профиля
  const profileMenu = (
    <Menu>
      <Menu.Item key="1" onClick={() => navigate("/profile")} icon={<IdcardOutlined />}>
        Личный кабинет
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" danger onClick={() => navigate("/login")} icon={<LogoutOutlined />}>
        Выйти
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Шапка с навигацией */}
      <Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#001529", padding: "0 20px" }}>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[activePage]}
          onClick={(e) => setActivePage(e.key)}
          style={{ flex: 1 }}
        >
          <Menu.Item key="visit-log" icon={<FileTextOutlined />}>
            Журнал посещений
          </Menu.Item>
          <Menu.Item key="security-management" icon={<TeamOutlined />}>
            Управление охранниками
          </Menu.Item>
        </Menu>
        <Dropdown overlay={profileMenu} placement="bottomRight">
          <Button type="primary" icon={<UserOutlined />}>
            Администратор
          </Button>
        </Dropdown>
      </Header>

      {/* Основное содержимое */}
      <Content style={{ padding: 24, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Title level={3}>
          {activePage === "visit-log" ? "Журнал посещений" : "Управление охранниками"}
        </Title>

        {activePage === "visit-log" ? (
          <Table
            columns={[
              { title: "Пользователь", dataIndex: "user", key: "user" },
              { title: "Дата и время", dataIndex: "date", key: "date" },
              { title: "Охранник", dataIndex: "security", key: "security" },
            ]}
            dataSource={visitData}
            style={{ width: "80%", maxWidth: 800 }}
          />
        ) : (
          <Table
            columns={[
              { title: "ID", dataIndex: "id", key: "id" },
              { title: "ФИО", dataIndex: "name", key: "name" },
              { title: "Дата назначения", dataIndex: "date", key: "date" },
              { title: "Уровень доступа", dataIndex: "access", key: "access" },
              { title: "Статус", dataIndex: "status", key: "status" },
            ]}
            dataSource={securityData}
            style={{ width: "80%", maxWidth: 800 }}
          />
        )}
      </Content>
    </Layout>
  );
};

export default AdminPanel;
