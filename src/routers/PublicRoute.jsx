import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isAuthenticated = false; // Replace this with actual auth logic
  return isAuthenticated ? <Navigate to="/app/dashboard" /> : children;
};

export default PublicRoute;
