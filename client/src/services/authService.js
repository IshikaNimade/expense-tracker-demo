import api from "../api/api";

export const registerUser = async (userData) => {
  try {
    console.log("Sending register request with data:", userData);
    const response = await api.post("/users/register", userData);
    return response.data.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.data.message || "Registration failed.";
    }
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post("/users/login", userData);
    return response.data.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.data.message || "Login failed.";
    }
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};
