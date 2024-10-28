const express = require("express");
const router = express.Router();

const { Church, Service } = require("../../db/models");

router.get("/", async (req, res) => {
  try {
    const services = await Service.findAll({
      attributes: { exclude: ["id", "churchId"] },
      include: [
        {
          model: Church,
          attributes: { exclude: ["id"] },
        },
      ],
    });

    res.status(200).json({ success: true, services });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: req.__("loadDataServerError") });
  }
});

module.exports = router;
