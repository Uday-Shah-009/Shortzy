import React from "react";
import "./index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "@tanstack/react-router";
import Navbar from "./Components/Navbar";

const App = () => {
  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default App;
