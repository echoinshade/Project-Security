const express = require('express');
const router = express.Router();
const db = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/server/api/register', async (req, res) => {
    const { lastName, firstName, middleName, email, password, passportSeries, passportNumber } = req.body;

    if (!lastName || !firstName || !email || !password || !passportSeries || !passportNumber) {
        return res.status(400).json({ message: 'Все поля обязательны' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // 1️⃣ Добавляем паспортные данные
        const [passportResult] = await db.query(
            'INSERT INTO passports (LastName, FirstName, MiddleName, PassportSeries, PassportNumber) VALUES (?, ?, ?, ?, ?)',
            [lastName, firstName, middleName || null, passportSeries, passportNumber]
        );

        const passportId = passportResult.insertId; // Получаем ID паспорта

        // 2️⃣ Добавляем пользователя
        await db.query(
            'INSERT INTO users (Email, Password, Role_ID, Passport_ID) VALUES (?, ?, ?, ?)',
            [email, hashedPassword, 3, passportId]
        );

        res.json({ message: 'Регистрация успешна!' });
    } catch (error) {
        console.error('Ошибка регистрации:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});




module.exports = router;

