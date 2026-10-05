import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/images/LogoIconBrandColor.svg";
import clockIcon from "../assets/images/clockIcon.svg";

export default function TopBarBrand({
  name = "Al-Aarid",
  showTime = false,
  showDateTime = false,
  onLogout,
  language = "en",
  onToggleLanguage,
  onTransactionHistory,
}) {
  const [time, setTime] = useState(() => new Date());
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    if (!showTime && !showDateTime) return undefined;
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, [showTime, showDateTime]);

  useEffect(() => {
    if (!userMenuOpen) return undefined;
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuOpen]);

  return (
    <div className="topBarBrand">
      <img src={logo} alt={name} className="topBarLogo" />
      <span className="topBarBrandName">{name}</span>
      {showTime && (
        <span className="topBarBrandTime">
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      )}
      {showDateTime && (
        <>
          <span className="topBarBrandDivider" />
          <span className="topBarDateTime">
            <span>{time.toLocaleDateString()}</span>
            <span className="dot">•</span>
            <span className="topBarDateTimeValue">
              {time.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
          </span>
        </>
      )}
      {showDateTime && (
        <>
          <button type="button" className="txHistoryBtn" onClick={onTransactionHistory}>
            <img src={clockIcon} alt="" className="txHistoryBtnIcon" />
            Transaction History
          </button>

          {userMenuOpen && <div className="userMenuOverlay" />}

          <div className="topBarUser" ref={userMenuRef}>
            <button
              type="button"
              className="topBarUserTrigger"
              onClick={() => setUserMenuOpen((prev) => !prev)}
            >
              <span className="userAvatar">AS</span>
              <div className="userMeta">
                <span className="userName">Abdullah S.</span>
                <span className="userStation">Station POS #1</span>
              </div>
            </button>

            {userMenuOpen && (
              <div className="userMenu">
                <div className="userMenuHeader">
                  <span className="userAvatar userAvatar--lg">AS</span>
                  <div className="userMeta">
                    <span className="userName">Abdullah S.</span>
                    <span className="userStation">
                      Cashier • Station POS #1
                    </span>
                  </div>
                </div>

                <div className="userMenuDivider" />

                <button type="button" className="userMenuItem">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M2 12s3.8-7 10-7 10 7 10 7-3.8 7-10 7-10-7-10-7Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                  </svg>
                  Switch to Staff
                </button>

                <button
                  type="button"
                  className="userMenuItem"
                  onClick={() => {
                    setUserMenuOpen(false);
                    onToggleLanguage?.();
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                  </svg>
                  {language === "ar" ? "Switch to English" : "Switch to Arabic"}
                </button>

                <button type="button" className="userMenuItem">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M19.4 13a7.6 7.6 0 0 0 0-2l2-1.5-2-3.4-2.4 1a7.6 7.6 0 0 0-1.7-1L15 3h-4l-.3 2.6a7.6 7.6 0 0 0-1.7 1l-2.4-1-2 3.4L6.6 11a7.6 7.6 0 0 0 0 2l-2 1.5 2 3.4 2.4-1a7.6 7.6 0 0 0 1.7 1L11 21h4l.3-2.6a7.6 7.6 0 0 0 1.7-1l2.4 1 2-3.4Z"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Account Settings
                </button>

                <div className="userMenuDivider" />

                <button
                  type="button"
                  className="userMenuItem userMenuItem--danger"
                  onClick={() => {
                    setUserMenuOpen(false);
                    onLogout?.();
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M16 17l5-5-5-5M21 12H9"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Log Out
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
