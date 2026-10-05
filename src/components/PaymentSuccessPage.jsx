import React from "react";
import RiyalIcon from "./RiyalIcon.jsx";
import tartishIconSmall from "../assets/images/LogoIconBrandColor.svg";
import "../styles/PaymentSuccessPage.scss";

export default function PaymentSuccessPage({
  authorizedVia = "Tap to Pay",
  brandName = "Tartish",
  transactionId = "TR-98402",
  dateTime = "06 Nov 2025, 14:30",
  cashierName = "Abdullah S.",
  vehiclePlate = "ABC 1234 (KSA)",
  items = [{ name: "1x Protect Single Wash", price: 72 }],
  total = 72,
  onPrintReceipt,
  onGoHome,
}) {
  return (
    <div className="paymentSuccessPage">
      <div className="paymentSuccessPanel">
        <div className="paymentSuccessIcon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 13l4 4L19 7"
              stroke="#2bb673"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="paymentSuccessTitle">Payment Successful!</h1>
        <p className="paymentSuccessSubtitle">Authorized via {authorizedVia}</p>

        <button type="button" className="paymentSuccessPrintBtn" onClick={onPrintReceipt}>
          Print Customer Receipt
        </button>
        <button type="button" className="paymentSuccessHomeBtn" onClick={onGoHome}>
          Go to Home
        </button>
      </div>

      <div className="receiptPanel">
        <div className="receiptBrand">
          <img src={tartishIconSmall} alt="" className="receiptBrandIcon" />
          <span className="receiptBrandName">{brandName}</span>
        </div>

        <div className="receiptDivider" />

        <div className="receiptRow">
          <span className="receiptLabel">Transaction ID</span>
          <span className="receiptValue">#{transactionId}</span>
        </div>
        <div className="receiptRow">
          <span className="receiptLabel">Date &amp; Time</span>
          <span className="receiptValue">{dateTime}</span>
        </div>
        <div className="receiptRow">
          <span className="receiptLabel">Cashier Name</span>
          <span className="receiptValue">{cashierName}</span>
        </div>
        <div className="receiptRow">
          <span className="receiptLabel">Vehicle Plate</span>
          <span className="receiptValue">{vehiclePlate}</span>
        </div>

        <div className="receiptDivider center" />

        {items.map((item) => (
          <div className="receiptRow receiptRow--item" key={item.name}>
            <span className="receiptItemName">{item.name}</span>
            <span className="receiptItemPrice">
              <RiyalIcon width={13} height={14} /> {item.price.toFixed(2)}
            </span>
          </div>
        ))}

        <div className="receiptDivider" />

        <div className="receiptRow receiptRow--total">
          <span>Total Paid</span>
          <span className="receiptTotalPrice">
            <RiyalIcon width={17} height={18} color="#2f9fe8" /> {total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
