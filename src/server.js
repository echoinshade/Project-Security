require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const db = require('./db'); // Подключение к MySQL
const routes = require('./routes'); // Маршруты API

const app = express();
app.use(cors()); // Разрешаем запросы с других доменов
app.use(express.json()); // Позволяет работать с JSON

app.use('/api', routes); // Подключаем маршруты

app.get('/', (req, res) => {
    res.send('Сервер работает!');
});
app.use(express.static('public'));

// Проверка подключения
db.query('SELECT 1')
    .then(() => console.log('✅ Подключение к БД успешно!'))
    .catch(err => console.error('❌ Ошибка подключения к БД:', err));


// Вывод таблицы passports
app.get('/passports', (req, res) => {
    db.query('SELECT * FROM passports', (err, results) => {
        if (err) {
            console.error('Ошибка выполнения запроса:', err);
            res.status(500).send('Ошибка сервера');
        } else {
            res.json(results); // Отправляем данные в JSON-формате
        }
    });
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
