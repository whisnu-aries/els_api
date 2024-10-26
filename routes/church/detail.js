const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();

const { Church, Service } = require("../../db/models");

router.get("/:key", async (req, res) => {
  const { key } = req.params;

  try {
    const church = await Church.findOne({
      attributes: { exclude: ["id"] },
      include: [
        {
          model: Service,
          attributes: { exclude: ["id"] },
        },
      ],
      where: {
        [Op.or]: [{ uuid: key }, { slug: key }],
      },
    });

    if (!church) {
      return res.status(404).json({ message: req.__("cannotFindData") });
    }

    res.status(200).json({ success: true, church });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: req.__("loadDataServerError") });
  }
});

module.exports = router;
