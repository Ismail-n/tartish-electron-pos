import React, { useCallback } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import SplashScreen from "./components/SplashScreen.jsx";
import LoginScreen from "./components/LoginScreen.jsx";
import PosLaneOverview from "./components/Poslaneoverview.jsx";

const AUTH_STORAGE_KEY = "tartish-pos.isLoggedIn";

function isAuthenticated() {
  return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

function SplashRoute() {
  const navigate = useNavigate();

  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  return <SplashScreen onFinished={() => navigate("/login")} />;
}

function LoginRoute() {
  const navigate = useNavigate();

  const handleLoginSuccess = useCallback(() => {
    localStorage.setItem(AUTH_STORAGE_KEY, "true");
    navigate("/dashboard", { replace: true });
  }, [navigate]);

  return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
}

function DashboardRoute() {
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    navigate("/login", { replace: true });
  }, [navigate]);

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <PosLaneOverview onLogout={handleLogout} />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashRoute />} />
      <Route path="/login" element={<LoginRoute />} />
      <Route path="/dashboard/*" element={<DashboardRoute />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
