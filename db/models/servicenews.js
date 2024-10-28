"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ServiceNews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ServiceNews.init(
    {
      churchId: DataTypes.INTEGER,
      serviceId: DataTypes.INTEGER,
      newsIs: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ServiceNews",
      tableName: "service_news",
    }
  );
  return ServiceNews;
};
