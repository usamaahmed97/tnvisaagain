import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  let loginState = localStorage.getItem("loginState");

  return loginState ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
