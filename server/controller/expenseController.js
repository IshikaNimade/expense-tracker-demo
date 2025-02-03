const { Expense } = require("../models");
const { validationResult } = require("express-validator");
const responseHandler = require("../utils/responseHandler");

const addExpense = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return responseHandler(res, 400, "Validation failed", errors.array());
  }

  try {
    const { amount, category, description } = req.body;
    const expense = await Expense.create({
      amount,
      category,
      description,
      userId: req.user.id,
    });

    responseHandler(res, 201, "Expense added", { expense });
  } catch (error) {
    responseHandler(res, 500, "Server error", { error: error.message });
  }
};

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({ where: { userId: req.user.id } });
    responseHandler(res, 200, "Expenses fetched successfully", { expenses });
  } catch (error) {
    responseHandler(res, 500, "Server error", { error: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense || expense.userId !== req.user.id) {
      return responseHandler(res, 403, "Not authorized", null);
    }

    await expense.destroy();
    responseHandler(res, 200, "Expense deleted", null);
  } catch (error) {
    responseHandler(res, 500, "Server error", { error: error.message });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const expenses = await Expense.findAll({ where: { userId: req.user.id } });

    let totalIncome = 0;
    let totalExpenses = 0;

    expenses.forEach((expense) => {
      if (expense.category.toLowerCase() === "income") {
        totalIncome += parseFloat(expense.amount);
      } else {
        totalExpenses += parseFloat(expense.amount);
      }
    });

    const balance = totalIncome - totalExpenses;

    responseHandler(res, 200, "Dashboard stats fetched", {
      totalIncome,
      totalExpenses,
      balance,
    });
  } catch (error) {
    responseHandler(res, 500, "Server error", { error: error.message });
  }
};

module.exports = { addExpense, getExpenses, deleteExpense, getDashboardStats };
