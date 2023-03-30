"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InforUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InforUser.init(
    {
      IDUser: DataTypes.INTEGER,
      fullname: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      avatar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "InforUser",
    }
  );
  return InforUser;
};