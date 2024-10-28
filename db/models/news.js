"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    static associate(models) {
      News.hasOne(models.ServiceNews, {
        foreignKey: "newsId",
        onDelete: "CASCADE",
      });
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
      content: DataTypes.TEXT,
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
