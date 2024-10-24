"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AccountVerification extends Model {
    static associate(models) {
      AccountVerification.belongsTo(models.Account, {
        foreignKey: "accountId",
      });
    }
  }
  AccountVerification.init(
    {
      accountId: DataTypes.INTEGER,
      token: DataTypes.UUID,
      usedAt: DataTypes.DATE,
      expiredAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "AccountVerification",
    }
  );
  return AccountVerification;
};
