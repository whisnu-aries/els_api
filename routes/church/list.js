const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();

const { Church, Service } = require("../../db/models");

router.get("/", async (req, res) => {
  try {
    const churches = await Church.findAll({
      attributes: { exclude: ["id"] },
      include: [
        {
          model: Service,
          attributes: { exclude: ["id"] },
        },
      ],
      where: {
        slug: {
          [Op.ne]: "global",
        },
      },
    });

    res.status(200).json({ success: true, churches });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: req.__("loadDataServerError") });
  }
});

module.exports = router;
