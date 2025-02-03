import React, { createContext, useState, useEffect, useContext } from "react";
import {
  getExpenses,
  addExpense,
  deleteExpense,
  getDashboardStats,
} from "../services/expenseService";
import { AuthContext } from "./AuthContext";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({
    balance: 0,
    totalIncome: 0,
    totalExpenses: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardStats();
      fetchExpenses();
    } else {
      setExpenses([]);
      setDashboardStats({
        balance: 0,
        totalIncome: 0,
        totalExpenses: 0,
      });
    }
  }, [isAuthenticated, user]);

  const fetchExpenses = async () => {
    if (!isAuthenticated) return;
    try {
      setLoading(true);
      const data = await getExpenses();
      setExpenses(data.expenses || []);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardStats = async () => {
    if (!isAuthenticated) return;
    try {
      setLoading(true);
      const stats = await getDashboardStats();
      setDashboardStats(stats);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const createExpense = async (expenseData) => {
    try {
      await addExpense(expenseData);
      await fetchExpenses();
      await fetchDashboardStats();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const removeExpense = async (id) => {
    try {
      await deleteExpense(id);
      await fetchExpenses();
      await fetchDashboardStats();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        dashboardStats,
        loading,
        createExpense,
        removeExpense,
        fetchExpenses,
        fetchDashboardStats,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
