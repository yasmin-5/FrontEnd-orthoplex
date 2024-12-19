import React from "react";
import Navbar from "../components/navbar";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
