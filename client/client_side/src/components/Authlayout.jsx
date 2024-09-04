import React from "react";
import LoginPage from "../pages/LoginPage";
import { Outlet } from "react-router-dom";

export default function Authlayout() {
  return (
    <>
    
      <Outlet />
    </>
  );
}
