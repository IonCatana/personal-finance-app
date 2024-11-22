import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "@pages/Dashboard";
import SignIn from "@pages/SignIn";
import SignUp from "@pages/SignUp";

const AppRoutes = () => {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));
  const location = useLocation();

  useEffect(() => {
    // Update authentication status whenever the location changes
    setIsAuth(!!localStorage.getItem("token"));
  }, [location]);

  return (
    <Routes>
      {/* Route for the dashboard */}
      <Route
        path="/"
        element={isAuth ? <Dashboard /> : <Navigate to="/signin" replace />}
      />

      {/* Route for the sign-in page */}
      <Route
        path="/signin"
        element={isAuth ? <Navigate to="/" replace /> : <SignIn />}
      />

      {/* Route for the sign-up page */}
      <Route
        path="/signup"
        element={isAuth ? <Navigate to="/" replace /> : <SignUp />}
      />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
