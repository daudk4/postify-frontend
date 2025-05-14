import React from "react";
import { Navigate } from "react-router";

const isAuthenticated = false;

export const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated) {
    return <Navigate to={"/signin"} />;
  }
  return <div>{children}</div>;
};
