// routes/auth/login.js
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  // Handle login logic here
  res.send("register route");
});

module.exports = router;