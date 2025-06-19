const bcrypt = require("bcrypt");

const saltRounds = 10;
const plainPassword = "1"; // Замени на реальный пароль

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error("Ошибка хеширования:", err);
  } else {
    console.log("Хешированный пароль:", hash);
  }
});
