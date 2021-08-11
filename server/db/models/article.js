"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  article.init(
    {
      author_id: DataTypes.STRING,
      title: DataTypes.STRING,
      thumbnail_type: DataTypes.STRING,
      thumbnail_color: DataTypes.STRING,
      content: DataTypes.STRING,
      tag: DataTypes.STRING,
      ingredient: DataTypes.STRING,
      like_user_id: {
        type: DataTypes.STRING,
        defaultValue: "[]"
      },
    },
    {
      sequelize,
      modelName: "article",
      freezeTableName: true,
    }
  );
  return article;
};
