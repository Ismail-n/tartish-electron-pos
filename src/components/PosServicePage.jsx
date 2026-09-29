import React, { useMemo, useState } from "react";
import "../styles/PosServicePage.scss";
import { toArabicDigit, toArabicLetter } from "../utils/plateTransliteration.js";
import RiyalIcon from "./RiyalIcon.jsx";
import checkIcon from "../assets/images/checkIcon.svg";
import cashIcon from "../assets/images/cashIcon.svg";

const WASH_TYPES = [
  { id: "single", label: "Single Wash" },
  { id: "membership", label: "Unlimited Membership" },
];

const SERVICES = [
  {
    id: "clean",
    name: "Clean",
    description: "Essential exterior wash. Simple, effective.",
    price: 68,
  },
  {
    id: "shine",
    name: "Shine",
    description: "A deeper clean with a glossy finish.",
    price: 68,
  },
  {
    id: "protect",
    name: "Protect",
    description: "Premium wash with surface protection.",
    price: 72,
  },
];

const INTERIOR_CLEAN_PRICE = 78;

const PAYMENT_METHODS = [
  {
    id: "cash",
    label: "Cash",
    getSubtitle: (total) => `Collect SR ${total} cash`,
  },
];

export default function PosServicePage({
  plateNumbers = "1234",
  plateLetters = "ABC",
  customerName = "Yousef Al-Harbi",
  mobileNumber = "542 123456",
  onBack,
  onContinue,
}) {
  const [washType, setWashType] = useState("single");
  const [selectedServiceId, setSelectedServiceId] = useState("protect");
  const [addInteriorClean, setAddInteriorClean] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const selectedService = SERVICES.find((s) => s.id === selectedServiceId);

  const total = useMemo(() => {
    const base = selectedService ? selectedService.price : 0;
    return base + (addInteriorClean ? INTERIOR_CLEAN_PRICE : 0);
  }, [selectedService, addInteriorClean]);

  const arabicNumbers = Array.from(plateNumbers).map(toArabicDigit).join("");
  const arabicLetters = Array.from(plateLetters).map(toArabicLetter).join(" ");

  return (
    <div className="posServicePage">
      <div className="posServiceMain">
        <div className="plateRegisteredHeader">
          <span className="plateRegisteredLabel">Plate Registered</span>
          <span className="plateRegisteredValue">
            {plateNumbers} {plateLetters}
            <span className="plateRegisteredDivider">|</span>
            <span dir="rtl">
              {arabicNumbers} {arabicLetters}
            </span>
          </span>
        </div>

        <div className="customerFields">
          <div className="customerField">
            <label className="customerFieldLabel">Name</label>
            <div className="customerFieldValue">{customerName}</div>
          </div>
          <div className="customerField">
            <label className="customerFieldLabel">Mobile Number</label>
            <div className="customerFieldValue">{mobileNumber}</div>
          </div>
        </div>

        <div className="washTypeToggle">
          {WASH_TYPES.map((type) => (
            <button
              key={type.id}
              type="button"
              className={`washTypeBtn${washType === type.id ? " washTypeBtn--active" : ""}`}
              onClick={() => setWashType(type.id)}
            >
              {type.label}
            </button>
          ))}
        </div>

        <div className="serviceList">
          {SERVICES.map((service) => {
            const selected = service.id === selectedServiceId;
            return (
              <button
                key={service.id}
                type="button"
                className={`serviceOption${selected ? " serviceOption--selected" : ""}`}
                onClick={() => setSelectedServiceId(service.id)}
              >
                <span className={`serviceRadio${selected ? " serviceRadio--checked" : ""}`}>
                  {selected && (
                    <img src={checkIcon} alt="" className="serviceRadioCheck" />
                  )}
                </span>
                <span className="serviceOptionBody">
                  <span className="serviceOptionName">{service.name}</span>
                  <span className="serviceOptionDesc">{service.description}</span>
                </span>
                <span className="serviceOptionPrice">
                  <RiyalIcon width={14} height={15} /> {service.price}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="posServiceSidebar">
        <div className="discountRow">
          <input
            type="text"
            className="discountInput"
            placeholder="Enter discount code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
          />
          <button type="button" className="discountApplyBtn">
            Apply
          </button>
        </div>

        <button
          type="button"
          className={`interiorCleanOption${addInteriorClean ? " interiorCleanOption--checked" : ""}`}
          onClick={() => setAddInteriorClean((prev) => !prev)}
        >
          <span className={`serviceRadio${addInteriorClean ? " serviceRadio--checked" : ""}`}>
            {addInteriorClean && (
              <img src={checkIcon} alt="" className="serviceRadioCheck" />
            )}
          </span>
          Add Interior Clean (+ {INTERIOR_CLEAN_PRICE})
        </button>

        <div className="orderSummary">
          <h2 className="orderSummaryTitle">Order Summary</h2>
          <div className="orderSummaryRow">
            <span>
              {selectedService ? selectedService.name : ""} {washType === "single" ? "Single Wash" : "Membership"}
            </span>
            <span className="orderSummaryPrice">
              <RiyalIcon width={13} height={14} /> {selectedService ? selectedService.price : 0}
            </span>
          </div>
          {addInteriorClean && (
            <div className="orderSummaryRow">
              <span>Interior Clean</span>
              <span className="orderSummaryPrice">
                <RiyalIcon width={13} height={14} /> {INTERIOR_CLEAN_PRICE}
              </span>
            </div>
          )}
          <div className="orderSummaryDivider" />
          <div className="orderSummaryRow orderSummaryRow--total">
            <span>Total Price</span>
            <span className="orderSummaryPrice">
              <RiyalIcon width={14} height={15} /> {total}
            </span>
          </div>
        </div>

        <div className="paymentMethods">
          {PAYMENT_METHODS.map((method) => {
            const active = paymentMethod === method.id;
            return (
              <button
                key={method.id}
                type="button"
                className={`paymentMethodCard${active ? " paymentMethodCard--active" : ""}`}
                onClick={() => setPaymentMethod(method.id)}
              >
                <span className="paymentMethodIcon">
                  <img src={cashIcon} alt="" className="paymentMethodIconImg" />
                </span>
                <span className="paymentMethodText">
                  <span className="paymentMethodLabel">{method.label}</span>
                  <span className="paymentMethodSubtitle">
                    {method.getSubtitle(total)}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <button type="button" className="continueBtn" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}
