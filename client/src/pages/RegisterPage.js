import React from "react";
import { Form, Input, Button, Checkbox, message, DatePicker, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    if (values.issue_date) {
      values.issue_date = values.issue_date.format("YYYY-MM-DD");
    }

    try {
      const response = await fetch("https://site04.sibinfo.ru:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        message.success("Регистрация успешна!");
        navigate("/login");
      } else {
        message.error(data.message || "Ошибка регистрации");
      }
    } catch (error) {
      message.error("Ошибка сервера, попробуйте позже.");
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <Form form={form} name="register" layout="vertical" onFinish={onFinish} initialValues={{ agreement: false }}>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item name="lastName" label="Фамилия" rules={[{ required: true, message: "Введите фамилию!" }]}>
              <Input placeholder="Фамилия" />
            </Form.Item>
            <Form.Item name="firstName" label="Имя" rules={[{ required: true, message: "Введите имя!" }]}>
              <Input placeholder="Имя" />
            </Form.Item>
            <Form.Item name="middleName" label="Отчество">
              <Input placeholder="Отчество (необязательно)" />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Введите корректный email!" }]}>
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item name="password" label="Пароль" rules={[{ required: true, message: "Введите пароль!" }]}>
              <Input.Password placeholder="Пароль" />
            </Form.Item>
            <Form.Item name="confirmPassword" label="Подтверждение пароля" dependencies={["password"]} rules={[{ required: true, message: "Подтвердите пароль!" }, ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Пароли не совпадают!"));
              }
            })]}>
              <Input.Password placeholder="Подтверждение пароля" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item name="passportSeries" label="Серия паспорта" rules={[{ required: true, message: "Введите серию паспорта!" }]}>
              <Input placeholder="Серия паспорта" />
            </Form.Item>
            <Form.Item name="passportNumber" label="Номер паспорта" rules={[{ required: true, message: "Введите номер паспорта!" }]}>
              <Input placeholder="Номер паспорта" />
            </Form.Item>
            <Form.Item label="Кем выдан" name="issued_by" rules={[{ required: true }]}>
              <Input placeholder="Орган, выдавший паспорт" />
            </Form.Item>
            <Form.Item label="Дата выдачи" name="issue_date" rules={[{ required: true }]}>
              <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Архивный номер" name="archive_NO">
              <Input placeholder="Архивный номер (если есть)" />
            </Form.Item>
            <Form.Item label="Код подразделения" name="department_code" rules={[{ required: true }]}>
              <Input placeholder="Код подразделения" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="agreement" valuePropName="checked" rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error("Вы должны согласиться с условиями!")) }]}>
          <Checkbox>Согласен с условиями</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>Зарегистрироваться</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;
