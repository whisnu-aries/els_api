"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  News.init(
    {
      uuid: DataTypes.UUID,
      authorId: DataTypes.INTEGER,
      category: DataTypes.ENUM("Service", "Event", "Administration", "Other"),
      title: DataTypes.STRING,
      slug: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.TEXT,
      isPublished: DataTypes.BOOLEAN,
      publishedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "News",
    }
  );
  return News;
};
