const { Church, Service } = require("../db/models");

const { body } = require("express-validator");

const getChurch = async (churchId, transaction) => {
  return await Church.findOne({
    attributes: ["id"],
    where: { uuid: churchId },
    transaction,
  });
};

const getService = async (serviceId, transaction) => {
  return await Service.findOne({
    attributes: ["id"],
    where: { uuid: serviceId },
    transaction,
  });
};

const validateChurchAndService = async (churchId, serviceId, transaction) => {
  let church = await getChurch(churchId, transaction);
  let service = await getService(serviceId, transaction);

  return {
    church,
    service,
  };
};

const validateCategory = (input) => {
  const validOptions = ["Service", "Event", "Administration", "Other"];
  if (validOptions.includes(input)) {
    return input;
  } else {
    return "Other";
  }
};

const insertServiceValidation = [
  body("category").notEmpty().withMessage("fieldCategoryIsRequired"),
  body("title").notEmpty().withMessage("fieldTitleIsRequired"),
  body("content").notEmpty().withMessage("fieldContentIsRequired"),
];

module.exports = {
  validateChurchAndService,
  validateCategory,
  insertServiceValidation,
};
