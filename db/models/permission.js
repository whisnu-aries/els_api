"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {
      Permission.belongsTo(models.Church, {
        foreignKey: "churchId",
      });
      Permission.belongsTo(models.Service, {
        foreignKey: "serviceId",
      });
      Permission.belongsTo(models.Role, {
        foreignKey: "roleId",
      });
      Permission.belongsTo(models.Feature, {
        foreignKey: "featureId",
      });
    }
  }
  Permission.init(
    {
      churchId: DataTypes.INTEGER,
      serviceId: DataTypes.INTEGER,
      roleId: DataTypes.INTEGER,
      featureId: DataTypes.INTEGER,
      canCreate: DataTypes.BOOLEAN,
      canRead: DataTypes.BOOLEAN,
      canUpdate: DataTypes.BOOLEAN,
      canDelete: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Permission",
    }
  );
  return Permission;
};
