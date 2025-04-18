const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // разрешает запросы с фронта
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Сервер работает! 🚀" });
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));
