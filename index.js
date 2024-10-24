const express = require("express");
const db = require("./db/models/index.js");

require("dotenv").config();

const app = express();
const port = process.env.APP_PORT;

app.get("/", (req, res) => {
  res.send("Welcome home!");
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
