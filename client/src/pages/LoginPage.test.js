jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "./LoginPage";
import { MemoryRouter } from 'react-router-dom';

describe("LoginPage", () => {
  beforeEach(() => {
    // Очищаем localStorage и мок-функции перед каждым тестом
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("успешный вход перенаправляет на страницу /admin при role_id === 1", async () => {
    // Мокаем fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ role_id: 1, userId: "123" }),
      })
    );

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "admin@example.com" } });
    fireEvent.change(screen.getByLabelText(/пароль/i), { target: { value: "password123" } });

    fireEvent.click(screen.getByRole("button", { name: /войти/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(mockedNavigate).toHaveBeenCalledWith("/admin");
      expect(localStorage.getItem("userId")).toBe("123");
    });
  });

  test("неуспешный вход показывает сообщение об ошибке", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 401,
        json: () => Promise.resolve({ message: "Неверные данные" }),
      })
    );

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "user@example.com" } });
    fireEvent.change(screen.getByLabelText(/пароль/i), { target: { value: "wrongpassword" } });

    fireEvent.click(screen.getByRole("button", { name: /войти/i }));

    await waitFor(() => {
      const { error } = require("antd").message;
      expect(error).toHaveBeenCalledWith("Неверные данные");
      expect(mockedNavigate).not.toHaveBeenCalled();
    });
  });
});
