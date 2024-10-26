const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const churchRoutes = require("./church");

// Use auth routes
router.use("/auth", authRoutes);
router.use("/churches", churchRoutes);

module.exports = router;
