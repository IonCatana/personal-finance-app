import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@pages/Dashboard";
import SignIn from "@pages/SignIn";
import SignUp from "@pages/SignUp";
import { useToken } from "@context/TokenContext";

const AppRoutes = () => {
  const { token } = useToken();

  return (
    <Routes>
      {/* Route for the dashboard */}
      <Route
        path="/"
        element={token ? <Dashboard /> : <Navigate to="/signin" replace />}
      />

      {/* Route for the sign-in page */}
      <Route
        path="/signin"
        element={token ? <Navigate to="/" replace /> : <SignIn />}
      />

      {/* Route for the sign-up page */}
      <Route
        path="/signup"
        element={token ? <Navigate to="/" replace /> : <SignUp />}
      />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
