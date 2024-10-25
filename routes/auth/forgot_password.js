// routes/auth/login.js
const express = require("express");
const { v4: uuidV4 } = require("uuid");
const { body, validationResult } = require("express-validator");

const { sequelize, Account, PasswordReset } = require("../../db/models");
const { addOneDay } = require("../../utils/date_time_utils");

const router = express.Router();

const forgotPasswordValidation = [
  body("email")
    .notEmpty()
    .withMessage("fieldEmailIsRequired")
    .isEmail()
    .withMessage("fieldEmailIsEmail"),
];

router.post("/", forgotPasswordValidation, async (req, res) => {
  const { email } = req.body;
  const errors = validationResult(req);
  const transaction = await sequelize.transaction();

  if (!errors.isEmpty()) {
    const translatedErrors = errors.array().map((err) => ({
      field: err.path,
      error_msg: req.__(err.msg),
    }));
    return res.status(422).json({ errors: translatedErrors });
  }

  try {
    const account = await Account.findOne({
      where: { email },
    });

    if (!account) {
      return res.status(404).json({
        success: false,
        error_msg: req.__("authAccountNotFound"),
      });
    }

    await PasswordReset.create(
      {
        accountId: account.id,
        token: uuidV4(),
        expiredAt: addOneDay(new Date()),
      },
      { transaction }
    );

    await transaction.commit();
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error_msg: req.__("authForgotPasswordServerError"),
    });
  }
});

module.exports = router;
