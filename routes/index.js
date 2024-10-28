const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const churchRoutes = require("./church");
const serviceRoutes = require("./service");

// Use auth routes
router.use("/auth", authRoutes);
router.use("/churches", churchRoutes);
router.use("/services", serviceRoutes);

module.exports = router;
