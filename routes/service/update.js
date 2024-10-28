const express = require("express");
var slugify = require("slugify");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const { sequelize, Church, Service } = require("../../db/models");

const updateServiceValidation = [
  body("churchId").notEmpty().withMessage("fieldChurchIsRequired"),
  body("name").notEmpty().withMessage("fieldNameIsRequired"),
  body("location").notEmpty().withMessage("fieldLocationIsRequired"),
  body("address").notEmpty().withMessage("fieldAddressIsRequired."),
  body("lat").isFloat().withMessage("fieldLatIsNotFloat"),
  body("lon").isFloat().withMessage("fieldLonIsNotFloat"),
  body("startTime").notEmpty().withMessage("fieldStartTimeIsRequired"),
  body("endTime").notEmpty().withMessage("fieldEndTimeIsRequired."),
  body("description").notEmpty().withMessage("fieldDescriptionIsRequired"),
];

router.put("/:uuid", updateServiceValidation, async (req, res) => {
  const { uuid } = req.params;
  const { churchId, ...formData } = req.body;
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
    const slug = await slugify(formData.name, { lower: true });

    const church = await Church.findOne({
      attributes: ["id"],
      where: { uuid: churchId },
      transaction,
    });

    if (!church) {
      return res.status(422).json({
        success: false,
        message: req.__("cannotFindChurchData"),
      });
    }

    const serviceValidate = await Service.findOne({
      where: { slug },
      transaction,
    });

    if (serviceValidate) {
      return res.status(422).json({
        success: false,
        message: req.__("serviceAlreadyRegistered"),
      });
    }

    const service = await Service.findOne({
      where: { uuid },
    });

    if (!service) {
      return res.status(404).json({ message: req.__("loadDataServerError") });
    }

    await service.update({
      ...formData,
      churchId: church.id,
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
