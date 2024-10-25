// routes/auth/login.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

const { sequelize, Account, PasswordReset } = require("../../db/models");
const { isNowAfterExpired } = require("../../utils/date_time_utils");

const passwordValidation = (fieldName) => {
  return body(fieldName)
    .notEmpty()
    .withMessage("fieldPasswordRequired")
    .isLength({ min: 6 })
    .withMessage("fieldPasswordLengthMin");
};

const resetPasswordValidation = [
  passwordValidation("password"),
  passwordValidation("confirmation_password"),
];

router.post("/:token", resetPasswordValidation, async (req, res) => {
  const { password, confirmation_password } = req.body;
  const token = req.params.token;
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
    if (password !== confirmation_password) {
      return res.status(404).json({
        success: false,
        error_msg: req.__("fieldPasswordIsNotMatch"),
      });
    }

    const request = await PasswordReset.findOne({
      where: { token },
      include: [{ model: Account }],
      transaction,
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        error_msg: req.__("authRequestNotFound"),
      });
    }

    if (request.usedAt) {
      return res.status(422).json({
        success: false,
        error_msg: req.__("authVerificationIsUsed"),
      });
    }

    if (isNowAfterExpired(request.expiredAt)) {
      return res.status(422).json({
        success: false,
        error_msg: req.__("authTokenIsExpired"),
      });
    }

    await request.update({ usedAt: new Date() }, { transaction });
    await request.Account.update(
      { password: await bcrypt.hash(password, 10) },
      { transaction }
    );

    await transaction.commit();
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    await transaction.rollback();
    return res.status(500).json({
      success: false,
      error_msg: req.__("authResetPasswordServerError"),
    });
  }
});

module.exports = router;
