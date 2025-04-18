import React from "react";
import { Layout, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Шапка с кнопкой "Войти" */}
      <Header style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", background: "#001529" }}>
        <Button type="primary" onClick={() => navigate("/login")}>
          Войти
        </Button>
      </Header>

      {/* Контент с текстом */}
      <Content style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 24 }}>
        <div style={{ maxWidth: 800, textAlign: "center" }}>
          <Title>Добро пожаловать на наш сайт!</Title>
          <Paragraph>
            Здесь можно разместить описание вашего сервиса или проекта. 
            Используйте этот раздел, чтобы рассказать пользователям о возможностях вашего приложения, 
            его преимуществах и способах использования.
          </Paragraph>
        </div>
      </Content>
    </Layout>
  );
};

export default HomePage;