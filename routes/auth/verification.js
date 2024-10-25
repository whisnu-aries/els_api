// routes/auth/login.js
const express = require("express");
const router = express.Router();

const { sequelize, Account, AccountVerification } = require("../../db/models");
const { isNowAfterExpired } = require("../../utils/date_time_utils");

router.get("/:token", async (req, res) => {
  const token = req.params.token;
  const transaction = await sequelize.transaction();

  try {
    const verification = await AccountVerification.findOne({
      where: { token },
      include: [{ model: Account }],
      transaction,
    });

    if (verification.usedAt || verification.Account.verifiedAt) {
      return res.status(422).json({
        success: false,
        error_msg: req.__("authVerificationIsUsed"),
      });
    }

    if (isNowAfterExpired(verification.expiredAt)) {
      return res.status(422).json({
        success: false,
        error_msg: req.__("authVerificationIsExpired"),
      });
    }

    await verification.update({ usedAt: new Date() }, { transaction });
    await verification.Account.update(
      { verifiedAt: new Date() },
      { transaction }
    );

    await transaction.commit();
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    await transaction.rollback();
    return res.status(500).json({
      success: false,
      error_msg: req.__("authVerificationServerError"),
    });
  }
});

module.exports = router;
