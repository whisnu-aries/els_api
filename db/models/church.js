"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Church extends Model {
    static associate(models) {
      Church.hasMany(models.Service, {
        foreignKey: "churchId",
        onDelete: "CASCADE",
      });
    }
  }
  Church.init(
    {
      uuid: DataTypes.UUID,
      slug: DataTypes.STRING,
      icon: DataTypes.STRING,
      name: DataTypes.STRING,
      address: DataTypes.TEXT,
      lat: DataTypes.FLOAT,
      lon: DataTypes.FLOAT,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Church",
    }
  );
  return Church;
};
