const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.APP_PORT;

app.get("/", (req, res) => {
  res.send("Welcome home!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
