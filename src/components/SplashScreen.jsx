import React, { useEffect } from "react";
import splashImage from "../assets/images/tartishSplashBg.webp";
import "../styles/splashScreen.scss";

const SPLASH_DURATION_MS = 2000;

export default function SplashScreen({ onFinished }) {
  useEffect(() => {
    const timer = setTimeout(onFinished, SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <div className="container">
      <img src={splashImage} alt="Tartish POS" className="splash_image" />
    </div>
  );
}