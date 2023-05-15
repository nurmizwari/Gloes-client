import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function PrivateRoute() {
  const access_token = localStorage.getItem("access_token");
  if (!access_token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
