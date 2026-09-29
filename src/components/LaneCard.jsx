import React from "react";
import LicensePlateInput from "./Licenseplateinput.jsx";
import "../styles/Lanecard.scss";

export default function LaneCard({
  title,
  statusLabel,
  statusVariant = "waiting",
  plateNumbers,
  plateLetters,
  language,
  onPlateChange,
  vehicleName,
  proceedEnabled = true,
  onProceed,
}) {
  return (
    <div className="laneCard">
      <div className="laneCardHeader">
        <span className="laneCardTitle">{title}</span>
        <span className={`statusBadge statusBadge--${statusVariant}`}>{statusLabel}</span>
      </div>

      <LicensePlateInput
        numbers={plateNumbers}
        letters={plateLetters}
        language={language}
        onChange={onPlateChange}
      />

      <div className="vehicleInfo">
        <div className="vehicleLabel">Detected Vehicle</div>
        <div className="vehicleName">{vehicleName}</div>
      </div>

      <button
        type="button"
        className="proceedBtn"
        disabled={!proceedEnabled}
        onClick={onProceed}
      >
        Proceed
      </button>
    </div>
  );
}