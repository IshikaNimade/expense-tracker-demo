import api from "../api/api";

export const getExpenses = async () => {
  try {
    const response = await api.get("/expenses");
    return response.data.data;
  } catch (error) {
    throw error.response?.data?.data.message || "Failed to fetch expenses.";
  }
};

export const addExpense = async (expenseData) => {
  try {
    const response = await api.post("/expenses/add", expenseData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.data.message || "Failed to add expense.";
  }
};

export const deleteExpense = async (id) => {
  try {
    await api.delete(`/expenses/${id}`);
  } catch (error) {
    throw error.response?.data?.data.message || "Failed to delete expense.";
  }
};

export const getDashboardStats = async () => {
  try {
    const response = await api.get("/expenses/dashboard");
    return response.data.data;
  } catch (error) {
    throw error.response?.data?.data.message || "Failed to delete expense.";
  }
};
