"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Account, {
        foreignKey: "accountId",
      });
      User.belongsTo(models.Role, {
        foreignKey: "roleId",
      });
    }
  }
  User.init(
    {
      uuid: DataTypes.UUID,
      accountId: DataTypes.INTEGER,
      roleId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      picture: DataTypes.STRING,
      birthday: DataTypes.DATE,
      phoneNumber: DataTypes.STRING,
      gender: DataTypes.ENUM("Male", "Female"),
      status: DataTypes.ENUM("Single", "Married", "Divorced", "Widowed"),
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
