const express = require("express");
const router = express.Router();

const { sequelize, Service } = require("../../db/models");

router.delete("/:uuid", async (req, res) => {
  const { uuid } = req.params;
  const transaction = await sequelize.transaction();

  try {
    const service = await Service.findOne({
      where: { uuid },
    });

    if (!service) {
      return res.status(404).json({ message: req.__("updateDataServerError") });
    }

    await service.destroy();
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
