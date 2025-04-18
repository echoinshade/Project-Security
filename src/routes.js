const express = require('express');
const router = express.Router();
const db = require('./db');

// Получить всех пользователей
router.get('/users', async (req, res) => {
    try {
        const [users] = await db.query("SELECT * FROM users");
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

// Добавить пользователя
router.post('/users', async (req, res) => {
    const { name, email } = req.body;
    try {
        await db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]);
        res.json({ message: "Пользователь добавлен" });
    } catch (err) {
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

module.exports = router;
