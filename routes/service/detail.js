const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();

const { Church, Service } = require("../../db/models");

router.get("/:key", async (req, res) => {
  const { key } = req.params;

  try {
    const service = await Service.findOne({
      attributes: { exclude: ["id", "churchId"] },
      include: [
        {
          model: Church,
          attributes: { exclude: ["id"] },
        },
      ],
      where: {
        [Op.or]: [{ uuid: key }, { slug: key }],
      },
    });

    if (!service) {
      return res.status(404).json({ message: req.__("cannotFindData") });
    }

    res.status(200).json({ success: true, service });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: req.__("loadDataServerError") });
  }
});

module.exports = router;
