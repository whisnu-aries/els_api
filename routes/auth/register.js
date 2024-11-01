const express = require("express");
const { v4: uuidV4 } = require("uuid");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

const {
  sequelize,
  Account,
  AccountVerification,
  User,
} = require("../../db/models");
const { addOneDay } = require("../../utils/date_time_utils");

const router = express.Router();

const requiredField = (fieldName, errorMsg) => {
  return body(fieldName).notEmpty().withMessage(errorMsg);
};

const passwordValidation = (fieldName) => {
  return body(fieldName)
    .notEmpty()
    .withMessage("fieldPasswordRequired")
    .isLength({ min: 6 })
    .withMessage("fieldPasswordLengthMin");
};

const registerValidation = [
  requiredField("email", "fieldEmailIsRequired")
    .isEmail()
    .withMessage("fieldEmailIsEmail"),
  passwordValidation("password"),
  passwordValidation("confirmation_password"),
  requiredField("name", "fieldNameIsRequired"),
  requiredField("phone_number", "fieldPhoneNumberIsRequired")
    .isLength({ min: 10 })
    .withMessage("fieldPhoneNumberLengthMin"),
  requiredField("birthday", "fieldPhoneNumberIsRequired")
    .isDate()
    .withMessage("fieldDateOfBirthIsNotValid")
    .toDate(),
];

router.post("/", registerValidation, async (req, res) => {
  const {
    email,
    password,
    confirmation_password,
    name,
    phone_number,
    birthday,
  } = req.body;
  const errors = validationResult(req);
  const transaction = await sequelize.transaction();

  if (!errors.isEmpty()) {
    const translatedErrors = errors.array().map((err) => ({
      field: err.path,
      message: req.__(err.msg),
    }));
    return res.status(422).json({ errors: translatedErrors });
  }

  try {
    if (password !== confirmation_password) {
      return res.status(404).json({
        success: false,
        message: req.__("fieldPasswordIsNotMatch"),
      });
    }

    const registeredEmail = await Account.findOne({
      where: {
        email,
      },
      transaction,
    });
    if (registeredEmail) {
      return res.status(422).json({
        success: false,
        message: req.__("authRegisterEmailIsRegistered"),
      });
    }

    const registeredPhoneNumber = await User.findOne({
      where: {
        phoneNumber: phone_number,
      },
      transaction,
    });
    if (registeredPhoneNumber) {
      return res.status(422).json({
        success: false,
        message: req.__("authRegisterPhoneNumberIsRegistered"),
      });
    }

    const account = await Account.create(
      {
        uuid: uuidV4(),
        email,
        password: await bcrypt.hash(password, 10),
      },
      { transaction }
    );

    await User.create(
      {
        uuid: uuidV4(),
        accountId: account.id,
        name,
        phoneNumber: phone_number,
        birthday,
      },
      { transaction }
    );

    await AccountVerification.create(
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
    await transaction.rollback();
    return res
      .status(500)
      .json({ success: false, message: req.__("authRegisterServerError") });
  }
});

module.exports = router;
