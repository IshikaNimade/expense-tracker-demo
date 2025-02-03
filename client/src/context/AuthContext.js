import React, { createContext, useState, useEffect } from "react";
import { loginUser, logoutUser, registerUser } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      setUser(JSON.parse(localStorage.getItem("user")));
    } else {
      setUser(null);
    }
  }, [token]);

  const register = async (userData) => {
    try {
      const data = await registerUser(userData);
      setToken(data.token);
      setUser({
        name: data.user.name,
        email: data.user.email,
        createdAt: data.user.createdAt,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.user.name,
          email: data.user.email,
          createdAt: data.user.createdAt,
        })
      );
      return data;
    } catch (error) {
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      const data = await loginUser(credentials);
      setToken(data.token);
      setUser({
        name: data.user.name,
        email: data.user.email,
        createdAt: data.user.createdAt,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.user.name,
          email: data.user.email,
          createdAt: data.user.createdAt,
        })
      );
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    logoutUser();
    setUser(null);
    setToken(null);
  };

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
