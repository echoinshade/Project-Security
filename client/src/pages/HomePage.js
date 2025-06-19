import React, { useEffect } from "react";
import { Layout, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const HomePage = () => {
  useEffect(() => {
    document.title = "Главная | sibinfo";
  }, []);
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
          <Title>Добро пожаловать на сайт для тестирования!</Title>
          <Paragraph>
            Этот веб-ресурс предназначен для демонстрации и проверки функциональности в рамках проекта. 
            Здесь реализованы основные модули, предусмотренные техническим заданием.
            Ознакомиться с полным техническим заданием вы можете по&nbsp;
            <a
              href="https://docs.google.com/document/d/1bL0F4zY8REDxqMdEWffpQRVq6GUxQF7Q9RGRctYQkqE/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              этой ссылке
            </a>
          </Paragraph>
        </div>
      </Content>
    </Layout>
  );
};

export default HomePage;