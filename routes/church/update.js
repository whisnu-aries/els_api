const express = require("express");
var slugify = require("slugify");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const { sequelize, Church } = require("../../db/models");

const updateChurchValidation = [
  body("name").notEmpty().withMessage("fieldNameIsRequired"),
  body("address").notEmpty().withMessage("fieldAddressIsRequired."),
  body("lat").isFloat().withMessage("fieldLatIsNotFloat"),
  body("lon").isFloat().withMessage("fieldLonIsNotFloat"),
  body("description").notEmpty().withMessage("fieldDescriptionIsRequired"),
];

router.put("/:uuid", updateChurchValidation, async (req, res) => {
  const { uuid } = req.params;
  const updates = req.body;
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
    const slug = await slugify(updates.name, { lower: true });

    const church = await Church.findOne({
      where: { uuid },
    });

    if (!church) {
      return res.status(404).json({ message: req.__("loadDataServerError") });
    }

    await church.update({
      ...updates,
      slug,
    });

    await transaction.commit();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    await transaction.rollback();
    return res
      .status(500)
      .json({ success: false, message: req.__("updateDataServerError") });
  }
});

module.exports = router;
