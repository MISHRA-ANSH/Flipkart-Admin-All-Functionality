import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  return localStorage.getItem("adminAuth") ? children : <Navigate to="/admin-login" />;
};

export default PrivateRoute;
