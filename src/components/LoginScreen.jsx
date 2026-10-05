import React, { useState } from "react";
import { Button, MessageBar, Spinner } from "@fluentui/react-components";
import "../styles/loginScreen.scss";
import splashImage from "../assets/images/tartishSplashBg.webp";
import logo from "../assets/images/tartishIconSmall.svg";
import TopBarBrand from "./TopBarBrand.jsx";
import { login, verifyLoginOtp } from "../api/authApi.js";
import { setAuthToken } from "../api/tokenStore.js";

function extractToken(response) {
  return (
    response?.token ||
    response?.data?.token ||
    response?.accessToken ||
    response?.data?.accessToken
  );
}

export default function LoginScreen({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [step, setStep] = useState("credentials");
  const [sessionId, setSessionId] = useState("");
  const [phoneNumberMasked, setPhoneNumberMasked] = useState("");
  const [otp, setOtp] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const response = await login(email, password);
      if (response?.data?.mfaRequired) {
        setSessionId(response.data.sessionId);
        setPhoneNumberMasked(response.data.phoneNumberMasked || "");
        setOtp("");
        setStep("otp");
        return;
      }
      setAuthToken(extractToken(response));
      onLoginSuccess();
    } catch (err) {
      setError(err.message || "Unable to sign in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleVerifyOtp(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const response = await verifyLoginOtp(sessionId, otp);
      setAuthToken(extractToken(response));
      onLoginSuccess();
    } catch (err) {
      setError(err.message || "Invalid or expired OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleBackToCredentials() {
    setError("");
    setOtp("");
    setStep("credentials");
  }

  return (
    <div className="loginScreen">
      <header className="topBar">
        <TopBarBrand name="Tartish POS" showTime />
      </header>

      <div
        className="container"
        style={{
          backgroundImage: `url(${splashImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="card">
          <div className="headingWrapper">
            <img src={logo} alt="Tartish" className="headingLogo" />
            <div className="heading">Sign in to POS</div>
          </div>
          <div className="subheading">
            {step === "otp"
              ? `Enter the code sent to ${phoneNumberMasked || "your registered number"}.`
              : "Sign in to access your station and start your shift."}
          </div>

          {step === "credentials" ? (
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
                      <rect
                        x="5"
                        y="11"
                        width="14"
                        height="9"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                      <path
                        d="M8 11V7a4 4 0 0 1 8 0v4"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
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
                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        />
                        <path
                          d="M3 3l18 18"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <MessageBar intent="error" className="loginErrorBar">
                  {error}
                </MessageBar>
              )}

              <Button
                appearance="primary"
                type="submit"
                className="submitButton"
                disabled={isSubmitting}
                icon={isSubmitting ? <Spinner size="tiny" /> : undefined}
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <div>
                <label className="fieldLabel" htmlFor="otp">
                  OTP Code
                </label>
                <div className="inputWrapper">
                  <input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    className="pillInput"
                    placeholder="Enter code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              </div>

              {error && (
                <MessageBar intent="error" className="loginErrorBar">
                  {error}
                </MessageBar>
              )}

              <Button
                appearance="primary"
                type="submit"
                className="submitButton"
                disabled={isSubmitting || !otp}
                icon={isSubmitting ? <Spinner size="tiny" /> : undefined}
              >
                {isSubmitting ? "Verifying..." : "Verify OTP"}
              </Button>

              <Button
                appearance="transparent"
                type="button"
                className="backButton"
                disabled={isSubmitting}
                onClick={handleBackToCredentials}
              >
                Back to sign in
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
