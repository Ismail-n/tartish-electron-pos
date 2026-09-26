import React, { useState } from "react";
import LaneCard from "./LaneCard.jsx";
import logo from "../assets/images/tartishIconSmall.svg";
import "../styles/posLaneOverview.scss";

const INITIAL_LANES = [
  {
    id: "lane-1",
    title: "Lane 1 - Cash",
    statusLabel: "Waiting",
    statusVariant: "waiting",
    plateNumbers: "1234",
    plateLetters: "AAA",
    vehicleName: "Hyundai Elantra (Silver)",
    proceedEnabled: true,
  },
  {
    id: "lane-2",
    title: "Lane 2 - Members Only",
    statusLabel: "Processing",
    statusVariant: "processing",
    plateNumbers: "1234",
    plateLetters: "AAA",
    vehicleName: "Hyundai Elantra (Silver)",
    proceedEnabled: false,
  },
];

export default function PosLaneOverview() {
  const [lanes, setLanes] = useState(INITIAL_LANES);
  const [toast, setToast] = useState({
    title: "Member Check-in — 1234 AAA",
    subtitle: "Member check-in recorded",
    time: "Just Now",
  });

  function handlePlateChange(laneId, numbers, letters) {
    setLanes((prev) =>
      prev.map((lane) =>
        lane.id === laneId ? { ...lane, plateNumbers: numbers, plateLetters: letters } : lane
      )
    );
  }

  function handleProceed(laneId) {
    // Wire this up to the actual lane-progression flow.
    console.log("Proceeding lane", laneId);
  }

  return (
    <div className="posLaneOverview">
      <header className="topBar">
        <div className="topBarBrand">
          <img src={logo} alt="Al-Aarid" className="topBarLogo" />
          <span className="topBarBrandName">Al-Aarid</span>
        </div>

        <button type="button" className="langToggle">العربية</button>

        <div className="topBarDateTime">
          <span>09/09/2026</span>
          <span className="dot">•</span>
          <span>12:05:38 PM</span>
        </div>

        <button type="button" className="txHistoryBtn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
            <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          Transaction History
        </button>

        <div className="topBarUser">
          <span className="userAvatar">AS</span>
          <div className="userMeta">
            <span className="userName">Abdullah S.</span>
            <span className="userStation">Station POS #1</span>
          </div>
        </div>
      </header>

      <div className="pageHeader">
        <h1 className="pageTitle">Live Wash Lane</h1>
        <div className="pageHeaderActions">
          <button type="button" className="btnOutline">In-Store Vehicles</button>
          <button type="button" className="btnPrimary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
            Add Vehicle Manually
          </button>
        </div>
      </div>

      <div className="laneGrid">
        {lanes.map((lane) => (
          <LaneCard
            key={lane.id}
            title={lane.title}
            statusLabel={lane.statusLabel}
            statusVariant={lane.statusVariant}
            plateNumbers={lane.plateNumbers}
            plateLetters={lane.plateLetters}
            onPlateChange={(numbers, letters) => handlePlateChange(lane.id, numbers, letters)}
            vehicleName={lane.vehicleName}
            proceedEnabled={lane.proceedEnabled}
            onProceed={() => handleProceed(lane.id)}
          />
        ))}
      </div>

      {toast && (
        <div className="toast">
          <span className="toastDot" />
          <div className="toastBody">
            <div className="toastTitle">{toast.title}</div>
            <div className="toastSubtitle">{toast.subtitle}</div>
          </div>
          <span className="toastTime">{toast.time}</span>
        </div>
      )}
    </div>
  );
}