import React from "react";
import { Navigate } from "react-router-dom";

export const HandleLogout = () => {
  localStorage.removeItem("pixit");
  return <Navigate to="/login" />;
};

export const ProtectedRoute = ({ children }) => {
  if (!localStorage.getItem("pixit")) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};
