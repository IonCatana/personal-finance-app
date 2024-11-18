import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "@pages/Dashboard";
import SignIn from "@pages/SignIn";
import SignUp from "@pages/SignUp";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default AppRoutes;
