import React from "react";
import { Navigate, Outlet } from "react-router-dom";
export default function PrivateComponent() {
  const auth = JSON.parse(localStorage.getItem("user"));
  return auth ? <Outlet /> : <Navigate to="/signup" />;
}
