const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const { appMiddleware, langMiddleware } = require("./middleware/index");
const locales = require("./locales/locales");

require("dotenv").config();

const routes = require("./routes/index");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100, // 100 permintaan
});

const port = process.env.APP_PORT;

const app = express();
app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(locales.init);

app.use(langMiddleware);

app.get("/status", (req, res) => {
  return res.status(200).json({
    status: "OK",
    message: req.__("status"),
  });
});

app.use("/api", appMiddleware, routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
