const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

const { appMiddleware } = require("./middleware/index.js");
const db = require("./db/models/index.js");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100, // 100 permintaan
});

const port = process.env.APP_PORT;

const app = express();
app.use(helmet());
app.use(cors());
app.use(limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.multipart());

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
