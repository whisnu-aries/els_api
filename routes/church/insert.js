const express = require("express");
const { v4: uuidV4 } = require("uuid");
const slugify = require("slugify");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const { sequelize, Church } = require("../../db/models");

const insertChurchValidation = [
  body("name").notEmpty().withMessage("fieldNameIsRequired"),
  body("address").notEmpty().withMessage("fieldAddressIsRequired."),
  body("lat").isFloat().withMessage("fieldLatIsNotFloat"),
  body("lon").isFloat().withMessage("fieldLonIsNotFloat"),
  body("description").notEmpty().withMessage("fieldDescriptionIsRequired"),
];

router.post("/", insertChurchValidation, async (req, res) => {
  const { name } = req.body;
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
    const slug = await slugify(name, { lower: true });

    const church = await Church.findOne({
      where: { slug },
    });
    if (church) {
      return res.status(422).json({
        success: false,
        message: req.__("churchAlreadyRegistered"),
      });
    }

    await Church.create({
      uuid: uuidV4(),
      slug,
      ...req.body,
    });

    await transaction.commit();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    await transaction.rollback();
    return res
      .status(500)
      .json({ success: false, message: req.__("insertDataServerError") });
  }
});

module.exports = router;
