const express = require("express");
const { body } = require("express-validator");
const authMiddleware = require("../middleware/auth");

const {
  addExpense,
  getExpenses,
  deleteExpense,
  getDashboardStats,
} = require("../controller/expenseController");

const router = express.Router();

router.post(
  "/add",
  [authMiddleware, body("amount").isNumeric(), body("category").notEmpty()],
  addExpense
);

router.get("/", authMiddleware, getExpenses);

router.delete("/:id", authMiddleware, deleteExpense);

router.get("/dashboard", authMiddleware, getDashboardStats);

module.exports = router;
