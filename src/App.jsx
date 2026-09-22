import React, { useCallback, useState } from "react";
import SplashScreen from "./components/SplashScreen.jsx";
import LoginScreen from "./components/LoginScreen.jsx";

const VIEW = {
  SPLASH: "splash",
  LOGIN: "login",
  DASHBOARD: "dashboard",
};

export default function App() {
  const [view, setView] = useState(VIEW.SPLASH);

  const handleSplashFinished = useCallback(() => setView(VIEW.LOGIN), []);
  const handleLoginSuccess = useCallback(() => setView(VIEW.DASHBOARD), []);

  if (view === VIEW.SPLASH) {
    return <SplashScreen onFinished={handleSplashFinished} />;
  }

  if (view === VIEW.LOGIN) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return <div style={{ padding: 24, color: "#fff" }}>POS dashboard coming soon Updated.</div>;
}
