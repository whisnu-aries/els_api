// routes/index.js
const express = require("express");
const router = express.Router();

// Import auth routes
const loginRoute = require("./login");
const registerRoute = require("./register");
const verificationRoute = require("./verification");
const forgotPasswordRoute = require("./forgot_password");
const resetPasswordRoute = require("./reset_password");

// Use auth routes
router.use("/login", loginRoute);
router.use("/register", registerRoute);
router.use("/verification", verificationRoute);
router.use("/forgotPassword", forgotPasswordRoute);
router.use("/resetPassword", resetPasswordRoute);

module.exports = router;
