require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const authenticateToken = require('./middleware/auth');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "2Shiharuloveroll",
    database: "securitysystem",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const app = express();


const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
  
app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Сервер работает!');
});

// Логирование входящих запросов
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

// Авторизация пользователя
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Введите email и пароль" });
    }

    try {
        const connection = await pool.getConnection();
        const [users] = await connection.execute(
            "SELECT id, role_id, passport_id, email, password FROM users WHERE email = ?", 
            [email]
        );

        connection.release();

        if (users.length === 0) {
            return res.status(401).json({ message: "Неверный email или пароль" });
        }

        const user = users[0];
        console.log("Полученные данные из БД:", user);
        console.log("Пароль из базы:", user.password);
        console.log("Введённый пароль:", password);

        if (!user.password) {
            return res.status(500).json({ message: "Ошибка: пароль в базе данных пустой!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Неверный email или пароль" });
        }

        res.status(200).json({ message: "Вход успешен", role_id: user.role_id, userId: user.id });
    } catch (error) {
        console.error("Ошибка при входе:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

  


// Регистрация пользователя
app.post("/api/register", async (req, res) => {
    const { lastName, firstName, middleName, passportSeries, passportNumber, issued_by, issue_date, archive_NO, department_code, email, password } = req.body;
    const connection = await pool.getConnection();

    try {
        const [passportResult] = await connection.query(
            "INSERT INTO passports (surname, name, patronymic, passport_series, passport_number, issued_by, issue_date, archive_NO, department_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [lastName, firstName, middleName || null, passportSeries, passportNumber, issued_by, issue_date, archive_NO || null, department_code || null]
        );

        const passportId = passportResult.insertId;
        const hashedPassword = await bcrypt.hash(password, 10);

        await connection.query(
            "INSERT INTO users (email, password, passport_id, role_id) VALUES (?, ?, ?, ?)",
            [email, hashedPassword, passportId, 3]
        );

        res.status(201).json({ message: "Пользователь успешно зарегистрирован!" });
    } catch (error) {
        console.error("Ошибка при регистрации:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    } finally {
        connection.release();
    }
});

// Проверка подключения к БД
(async () => {
    try {
        await pool.query('SELECT 1');
        console.log('✅ Подключение к БД успешно!');
    } catch (err) {
        console.error('❌ Ошибка подключения к БД:', err);
    }
})();

// Получение всех паспортов (тестовый маршрут)
app.get('/passports', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [results] = await connection.query('SELECT * FROM passports');
        connection.release();
        res.json(results);
    } catch (err) {
        console.error('Ошибка выполнения запроса:', err);
        res.status(500).send('Ошибка сервера');
    }
});

// Получение данных профиля пользователя по ID
app.get("/api/profile/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const connection = await pool.getConnection();

        const [rows] = await connection.execute(
            `SELECT 
                users.id AS user_id,
                users.email,
                users.role_id,
                passports.surname,
                passports.name,
                passports.patronymic,
                passports.passport_series,
                passports.passport_number,
                passports.issued_by,
                passports.issue_date,
                passports.archive_NO,
                passports.department_code
            FROM users
            LEFT JOIN passports ON users.passport_id = passports.id
            WHERE users.id = ?`,
            [userId]
        );

        connection.release();
        console.log("Запрос на профиль пользователя ID:", userId);
        console.log("Результат запроса:", rows);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        const user = rows[0];
        console.log("Полученные данные из JOIN:", rows);

        res.json({
            full_name: `${user.surname} ${user.name} ${user.patronymic}`,
            email: user.email,
            access_level: user.role_id === 1 ? "Администратор" :
                          user.role_id === 2 ? "Охранник" : "Пользователь",
            passport_series: user.passport_series,
            passport_number: user.passport_number,
            department_code: user.department_code,
            issued_by: user.issued_by,
            issue_date: user.issue_date,
        });

    } catch (error) {
        console.error("Ошибка при получении профиля:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

app.listen(5000, () => {
    console.log("Сервер запущен на http://localhost:5000");
    });  
  