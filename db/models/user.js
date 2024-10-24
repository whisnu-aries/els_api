"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Account, {
        foreignKey: "accountId",
      });
    }
  }
  User.init(
    {
      uuid: DataTypes.UUID,
      accountId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      picture: DataTypes.STRING,
      birthday: DataTypes.DATE,
      phoneNumber: DataTypes.STRING,
      gender: DataTypes.ENUM,
      status: DataTypes.ENUM,
      address: DataTypes.TEXT,
      city: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
