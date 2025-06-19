import React, { useState, useEffect } from "react";
import { Layout, Table, Typography, Button, Modal, Descriptions, Card } from "antd";
import { useNavigate } from "react-router-dom";

const { Header, Content } = Layout;
const { Title } = Typography;

const VisitLogPage = () => {
  useEffect(() => {
    document.title = "Журнал | sibinfo";
  }, []);
  const navigate = useNavigate();
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Данные таблицы (в будущем можно заменить MySQL)
  const visitData = [
    {
      key: "1",
      user: "Иван Петров",
      passport: "4510 123456",
      date: "2025-03-08 10:15",
      security: "Андреев В.А.",
      accessDenied: "Нет",
      denialReason: "-",
      denialSecurity: "-",
      visitHistory: [
        { date: "2025-03-01 09:00", security: "Павлов С.Н." },
        { date: "2025-02-15 14:20", security: "Андреев В.А." },
      ],
    },
    {
      key: "2",
      user: "Мария Сидорова",
      passport: "4512 654321",
      date: "2025-03-08 10:30",
      security: "Павлов С.Н.",
      accessDenied: "Да",
      denialReason: "Нет пропуска",
      denialSecurity: "Андреев В.А.",
      visitHistory: [{ date: "2025-02-20 11:10", security: "Кузнецов И.Д." }],
    },
  ];

  // Колонки таблицы
  const columns = [
    { title: "Пользователь", dataIndex: "user", key: "user" },
    { title: "Дата и время", dataIndex: "date", key: "date" },
    { title: "Охранник", dataIndex: "security", key: "security" },
  ];

  // Открыть модальное окно с деталями
  const openModal = (record) => {
    setSelectedVisit(record);
    setModalVisible(true);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Шапка с кнопкой выхода */}
      <Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#001529" }}>
        <Title style={{ color: "white", margin: 0 }}>Журнал посещений</Title>
        <Button type="primary" onClick={() => navigate("/profile")}>Личный кабинет</Button>
        <Button type="primary" danger onClick={() => navigate("/")}>
          Выйти
        </Button>
      </Header>

      {/* Контент с таблицей */}
      <Content style={{ padding: 24, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Table columns={columns} dataSource={visitData} style={{ width: "80%", maxWidth: 800 }} onRow={(record) => ({
          onClick: () => openModal(record),
        })} />

        {/* Модальное окно с карточкой посещения */}
        <Modal
          title="Детали посещения"
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
          width={800}
        >
          {selectedVisit && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "16px" }}>
              {/* ФИО и паспорт */}
              <Card title="Личные данные">
                <Descriptions column={1}>
                  <Descriptions.Item label="ФИО">{selectedVisit.user}</Descriptions.Item>
                  <Descriptions.Item label="Паспорт">{selectedVisit.passport}</Descriptions.Item>
                </Descriptions>
              </Card>

              {/* Данные о посещении */}
              <Card title="Текущее посещение">
                <Descriptions column={1}>
                  <Descriptions.Item label="Дата и время">{selectedVisit.date}</Descriptions.Item>
                  <Descriptions.Item label="Охранник">{selectedVisit.security}</Descriptions.Item>
                </Descriptions>
              </Card>

              {/* История отказов */}
              <Card title="История отказов">
                <Descriptions column={1}>
                  <Descriptions.Item label="Факт отказа">{selectedVisit.accessDenied}</Descriptions.Item>
                  <Descriptions.Item label="Причина отказа">{selectedVisit.denialReason}</Descriptions.Item>
                  <Descriptions.Item label="Охранник">{selectedVisit.denialSecurity}</Descriptions.Item>
                </Descriptions>
              </Card>

              {/* История посещений */}
              <Card title="История посещений">
                {selectedVisit.visitHistory.length > 0 ? (
                  <Table
                    dataSource={selectedVisit.visitHistory.map((item, index) => ({
                      key: index,
                      date: item.date,
                      security: item.security,
                    }))}
                    columns={[
                      { title: "Дата входа", dataIndex: "date", key: "date" },
                      { title: "Охранник", dataIndex: "security", key: "security" },
                    ]}
                    pagination={false}
                    size="small"
                  />
                ) : (
                  <p>Посещений не найдено</p>
                )}
              </Card>
            </div>
          )}
        </Modal>
      </Content>
    </Layout>
  );
};

export default VisitLogPage;
