"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subscriber extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Subscriber.init(
    {
      userToken: DataTypes.STRING,
      deviceToken: DataTypes.STRING,
      deviceType: DataTypes.STRING,
      language: DataTypes.CHAR(2),
      phoneNumber: DataTypes.STRING,
      isDeviceActive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Subscriber",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );
  return Subscriber;
};
