"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate(models) {
      Account.hasMany(models.Account_Verification, {
        foreignKey: "accountId",
        onDelete: "CASCADE",
      });
    }
  }
  Account.init(
    {
      uuid: DataTypes.UUID,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      verifiedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Account",
    }
  );
  return Account;
};
