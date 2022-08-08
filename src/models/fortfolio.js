"use strict";
const { Model } = require("sequelize");
console.log("SSS");
module.exports = (sequelize, DataTypes) => {
  class fortfolios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      console.log("cosss");
    }
  }
  fortfolios.init(
    {
      userId: DataTypes.STRING,
      coinId: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      priceInput: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "fortfolios",
    }
  );
  return fortfolios;
};
