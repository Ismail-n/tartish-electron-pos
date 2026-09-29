import React, { useState } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import LaneCard from "./LaneCard.jsx";
import TopBarBrand from "./TopBarBrand.jsx";
import InStoreVehicles from "./InStoreVehicles.jsx";
import PosServicePage from "./PosServicePage.jsx";
import "../styles/Poslaneoverview.scss";

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

function LaneGridView({ lanes, language, toast, onPlateChange, onProceed }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="pageHeader">
        <h1 className="pageTitle">Live Wash Lane</h1>
        <div className="pageHeaderActions">
          <button
            type="button"
            className="btnOutline"
            onClick={() => navigate("in-store")}
          >
            In-Store Vehicles
          </button>
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
            language={language}
            onPlateChange={(numbers, letters) => onPlateChange(lane.id, numbers, letters)}
            vehicleName={lane.vehicleName}
            proceedEnabled={lane.proceedEnabled}
            onProceed={() => onProceed(lane.id)}
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
    </>
  );
}

function ServiceRouteView({ lanes }) {
  const { laneId } = useParams();
  const navigate = useNavigate();
  const lane = lanes.find((l) => l.id === laneId);

  return (
    <PosServicePage
      plateNumbers={lane?.plateNumbers}
      plateLetters={lane?.plateLetters}
      onBack={() => navigate("/dashboard")}
      onContinue={() => navigate("/dashboard")}
    />
  );
}

export default function PosLaneOverview({ onLogout }) {
  const [lanes, setLanes] = useState(INITIAL_LANES);
  const [language, setLanguage] = useState("en");
  const [toast] = useState({
    title: "Member Check-in — 1234 AAA",
    subtitle: "Member check-in recorded",
    time: "Just Now",
  });
  const navigate = useNavigate();

  function handleToggleLanguage() {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  }

  function handlePlateChange(laneId, numbers, letters) {
    setLanes((prev) =>
      prev.map((lane) =>
        lane.id === laneId ? { ...lane, plateNumbers: numbers, plateLetters: letters } : lane
      )
    );
  }

  function handleProceed(laneId) {
    navigate(`service/${laneId}`);
  }

  return (
    <div className="posLaneOverview">
      <header className="topBar">
        <TopBarBrand
          showDateTime
          onLogout={onLogout}
          language={language}
          onToggleLanguage={handleToggleLanguage}
        />
      </header>

      <Routes>
        <Route
          index
          element={
            <LaneGridView
              lanes={lanes}
              language={language}
              toast={toast}
              onPlateChange={handlePlateChange}
              onProceed={handleProceed}
            />
          }
        />
        <Route
          path="in-store"
          element={<InStoreVehicles onBack={() => navigate("/dashboard")} />}
        />
        <Route
          path="service/:laneId"
          element={<ServiceRouteView lanes={lanes} />}
        />
      </Routes>
    </div>
  );
}
