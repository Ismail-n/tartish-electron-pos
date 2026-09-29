import React, { useState } from "react";
import "../styles/InStoreVehicles.scss";
import addInteriorIcon from "../assets/images/addInteriorIcon.svg";
import refundIcon from "../assets/images/refundIcon.svg";
import rewashIcon from "../assets/images/rewashIcon.svg";
import cancelWashIcon from "../assets/images/cancelWashIcon.svg";

const INITIAL_VEHICLES = [
  {
    id: "veh-1",
    plate: "4260 KAA",
    date: "19 Jan 2026",
    entry: "09:00 AM",
    exit: "09:50 AM",
    status: "washing",
    statusLabel: "Washing",
  },
  {
    id: "veh-2",
    plate: "4560 KAA",
    date: "19 Jan 2026",
    entry: "09:00 AM",
    status: "washing",
    statusLabel: "Washing",
    customer: "Abdullah",
    currentService: "Single Wash Clean",
  },
  {
    id: "veh-3",
    plate: "4260 KAA",
    date: "19 Jan 2026",
    entry: "09:00 AM",
    exit: "09:50 AM",
    status: "washing",
    statusLabel: "Washing",
  },
  {
    id: "veh-4",
    plate: "4860 KAA",
    date: "19 Jan 2026",
    entry: "09:00 AM",
    exit: "09:50 AM",
    status: "refundRequested",
    statusLabel: "Refund requested",
  },
];

function CarThumbnail() {
  return (
    <div className="vehicleThumb">
      <svg width="28" height="18" viewBox="0 0 28 18" fill="none">
        <path
          d="M2 12.5 4 6.5c.4-1.2 1.5-2 2.8-2h10.4c1.3 0 2.4.8 2.8 2l2 6"
          stroke="#7de3c0"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="1"
          y="12"
          width="26"
          height="4"
          rx="2"
          stroke="#7de3c0"
          strokeWidth="1.4"
        />
        <circle cx="7" cy="16" r="1.6" fill="#7de3c0" />
        <circle cx="21" cy="16" r="1.6" fill="#7de3c0" />
      </svg>
    </div>
  );
}

export default function InStoreVehicles({ onBack }) {
  const [vehicles] = useState(INITIAL_VEHICLES);
  const [expandedId, setExpandedId] = useState("veh-2");

  function toggleExpanded(id) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <div className="inStoreVehicles">
      <div className="inStoreBreadcrumb">
        <button type="button" className="breadcrumbBack" onClick={onBack}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 6l-6 6 6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Lane Overview
        </button>
        <span className="breadcrumbDivider">/</span>
        <span className="breadcrumbCurrent">In-Store Vehicles</span>
      </div>

      <div className="vehicleList">
        {vehicles.map((vehicle) => {
          const expanded = vehicle.id === expandedId;
          return (
            <div
              key={vehicle.id}
              className={`vehicleCard${expanded ? " vehicleCard--expanded" : ""}`}
              onClick={() => toggleExpanded(vehicle.id)}
            >
              <div className="vehicleCardRow">
                <CarThumbnail />
                <div className="vehicleCardInfo">
                  <div className="vehiclePlate">{vehicle.plate}</div>
                  <div className="vehicleMeta">
                    <p>{vehicle.date}</p>
                    <span>
                      {vehicle.exit
                        ? `Entry: ${vehicle.entry} | Exit: ${vehicle.exit}`
                        : ` Entry: ${vehicle.entry}`}
                    </span>
                  </div>
                </div>
                <span className={`statusPill statusPill--${vehicle.status}`}>
                  {vehicle.statusLabel}
                </span>
              </div>

              {expanded && (
                <div
                  className="vehicleCardExpanded"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="vehicleDetailBox">
                    <span className="vehicleDetailItem">
                      <span className="vehicleDetailLabel">Customer:</span>{" "}
                      <span className="vehicleDetailValue">
                        {vehicle.customer || "—"}
                      </span>
                    </span>
                    <span className="vehicleDetailItem">
                      <span className="vehicleDetailLabel">
                        Current Service:
                      </span>{" "}
                      <span className="vehicleDetailValue vehicleDetailValue--link">
                        {vehicle.currentService || "—"}
                      </span>
                    </span>
                    <a
                      href="#"
                      className="upgradePlanLink"
                      onClick={(e) => e.preventDefault()}
                    >
                      Upgrade Plan
                    </a>
                  </div>

                  <div className="vehicleActions">
                    <button
                      type="button"
                      className="vehicleActionBtn vehicleActionBtn--add"
                    >
                      <img
                        src={addInteriorIcon}
                        alt=""
                        className="vehicleActionBtnIcon"
                      />
                      Add Interior
                    </button>
                    <button
                      type="button"
                      className="vehicleActionBtn vehicleActionBtn--refund"
                    >
                      <img
                        src={refundIcon}
                        alt=""
                        className="vehicleActionBtnIcon"
                      />
                      Refund
                    </button>
                    <button
                      type="button"
                      className="vehicleActionBtn vehicleActionBtn--rewash"
                    >
                      <img
                        src={rewashIcon}
                        alt=""
                        className="vehicleActionBtnIcon"
                      />
                      Rewash
                    </button>
                    <button
                      type="button"
                      className="vehicleActionBtn vehicleActionBtn--cancel"
                    >
                      <img
                        src={cancelWashIcon}
                        alt=""
                        className="vehicleActionBtnIcon"
                      />
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
