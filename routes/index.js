const express = require("express");
const router = express.Router();

// Import auth routes
const authRoutes = require("./auth/index");

// Use auth routes
router.use("/auth", authRoutes);

module.exports = router;

// example for using middleware
// const { appMiddleware } = require("./middleware/index.js");

// app.get("/", appMiddleware, (req, res) => {
//   res.send("Welcome home!");
// });
