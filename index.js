const express = require("express");
const { appMiddleware } = require("./middleware/index.js");
const db = require("./db/models/index.js");

require("dotenv").config();

const app = express();
const port = process.env.APP_PORT;

app.get("/", appMiddleware, (req, res) => {
  res.send("Welcome home!");
});

app.get("/status", (req, res) => {
  res.send("API is running!");
});

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Koneksi ke database berhasil.");
  })
  .catch((err) => {
    console.error("Tidak dapat terhubung ke database:", err);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
