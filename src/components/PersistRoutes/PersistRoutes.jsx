import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PersistRoutes = () => {
  let loginState = localStorage.getItem("loginState");

  return loginState ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PersistRoutes;
