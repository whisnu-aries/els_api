"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PasswordReset extends Model {
    static associate(models) {
      PasswordReset.belongsTo(models.Account, {
        foreignKey: "accountId",
      });
    }
  }
  PasswordReset.init(
    {
      accountId: DataTypes.INTEGER,
      token: DataTypes.UUID,
      usedAt: DataTypes.DATE,
      expiredAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "PasswordReset",
    }
  );
  return PasswordReset;
};
