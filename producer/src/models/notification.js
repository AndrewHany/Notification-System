'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Notification.init(
    {
      text_en: DataTypes.TEXT,
      text_ar: DataTypes.TEXT,
      type: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Notification",
      updatedAt: false,
      defaultScope: {
        attributes: {
          exclude: ["createdAt"],
        },
      },
    }
  );
  return Notification;
};