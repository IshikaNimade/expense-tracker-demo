"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    static associate(models) {
      // define association here
    }
  }
  Expense.init(
    {
      amount: DataTypes.DECIMAL,
      category: DataTypes.STRING,
      description: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Expense",
      timestamps: true,
    }
  );
  return Expense;
};
