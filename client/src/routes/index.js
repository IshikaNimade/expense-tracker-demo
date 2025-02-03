import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="*" element={<NotFound />} />
    <Route path="/login" element={<Home />} />
    <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
  </Routes>
);

export default AppRoutes;
