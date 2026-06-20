const express = require("express");
const app = express();

app.use(express.json());

// 👇 главный маршрут
app.get("/", (req, res) => {
  res.send("Empire Clicker backend работает 🚀");
});

// тестовый API
app.get("/test", (req, res) => {
  res.json({ ok: true, message: "Backend alive" });
});

app.listen(3000, () => {
  console.log("Server running on 3000");
});