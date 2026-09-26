import React, { useState } from "react";
import { Button, MessageBar } from "@fluentui/react-components";
import "../styles/loginScreen.scss";
import logo from "../assets/images/tartishIconSmall.svg";
import splashImage from "../assets/images/tartishSplashBg.webp";

const DEMO_USERNAME = "admin@tartish.com";
const DEMO_PASSWORD = "admin";

export default function LoginScreen({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (email === DEMO_USERNAME && password === DEMO_PASSWORD) {
      setError("");
      onLoginSuccess();
    } else {
      setError("Invalid credentials. Try admin@tartish.com / admin.");
    }
  }

  return (
    <div className="container" style={{ backgroundImage: `url(${splashImage})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="card">
        <div className="logo">
          <img src={logo} alt="Tartish Logo" />
        </div>
        <div className="brandName">Tartish</div>
        <div className="heading">POS Login</div>
        <div className="subheading">Enter credentials to start shift</div>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="fieldLabel" htmlFor="email">
              Email
            </label>
            <div className="inputWrapper">
              <input
                id="email"
                type="email"
                className="pillInput"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="fieldLabel" htmlFor="password">
              Password
            </label>
            <div className="inputWrapper">
              <span className="inputIcon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="pillInput pillInput--withLeftIcon pillInput--withRightIcon"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="toggleIcon"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && <MessageBar intent="error">{error}</MessageBar>}

          <Button appearance="primary" type="submit" className="submitButton">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}