const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

const { Account, User } = require("../../db/models");

const router = express.Router();

const loginValidation = [
  body("email")
    .notEmpty()
    .withMessage("fieldEmailIsRequired")
    .isEmail()
    .withMessage("fieldEmailIsEmail"),
  body("password")
    .notEmpty()
    .withMessage("fieldPasswordRequired")
    .isLength({ min: 6 })
    .withMessage("fieldPasswordLengthMin"),
];

router.post("/", loginValidation, async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const translatedErrors = errors.array().map((err) => ({
      field: err.path,
      message: req.__(err.msg),
    }));
    return res.status(422).json({ errors: translatedErrors });
  }

  try {
    const account = await Account.findOne({
      where: { email },
      include: [{ model: User }],
    });

    if (!account) {
      return res.status(404).json({
        success: false,
        message: req.__("authAccountNotFound"),
      });
    }

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(404).json({
        success: false,
        message: req.__("authInvalidPassword"),
      });
    }

    const token = jwt.sign(
      {
        accountId: account.id,
        userId: account.User.id,
        roleId: account.User.roleId,
      },
      process.env.JWT_TOKEN,
      { expiresIn: "30d" }
    );

    return res.status(200).json({ success: true, token });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: req.__("authLoginServerError") });
  }
});

module.exports = router;
