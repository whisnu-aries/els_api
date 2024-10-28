"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate(models) {
      Service.belongsTo(models.Church, {
        foreignKey: "churchId",
      });
    }
  }
  Service.init(
    {
      uuid: DataTypes.UUID,
      churchId: DataTypes.INTEGER,
      slug: DataTypes.STRING,
      icon: DataTypes.STRING,
      name: DataTypes.STRING,
      location: DataTypes.STRING,
      address: DataTypes.TEXT,
      lat: DataTypes.FLOAT,
      lon: DataTypes.FLOAT,
      startTime: DataTypes.TIME,
      endTime: DataTypes.TIME,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Service",
    }
  );
  return Service;
};
