import React, { useRef, useState } from "react";
import "../styles/licensePlateInput.scss";

const ARABIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

// Simplified Saudi plate Latin-to-Arabic letter mapping for display purposes.
// Verify against the official transliteration table before using in production.
const LATIN_TO_ARABIC_LETTER = {
  A: "ا",
  B: "ب",
  J: "ح",
  D: "د",
  R: "ر",
  S: "س",
  X: "ص",
  T: "ط",
  K: "ك",
  L: "ل",
  Z: "م",
  N: "ن",
  G: "ق",
  H: "ه",
  V: "و",
  U: "ھ",
  E: "ع",
};

function toArabicDigit(char) {
  if (char === "" || char == null) return "";
  const digit = Number(char);
  return Number.isNaN(digit) ? "" : ARABIC_DIGITS[digit];
}

function toArabicLetter(char) {
  if (!char) return "";
  return LATIN_TO_ARABIC_LETTER[char.toUpperCase()] || "";
}

const NUMBER_SLOTS = 4;
const LETTER_SLOTS = 3;

export default function LicensePlateInput({
  numbers = "",
  letters = "",
  onChange,
  disabled = false,
}) {
  const [editing, setEditing] = useState(false);
  const inputRefs = useRef([]);

  const numberChars = Array.from({ length: NUMBER_SLOTS }, (_, i) => numbers[i] || "");
  const letterChars = Array.from({ length: LETTER_SLOTS }, (_, i) => letters[i] || "");
  const allChars = [...numberChars, ...letterChars];
  const totalSlots = NUMBER_SLOTS + LETTER_SLOTS;

  function commitChange(nextChars) {
    const nextNumbers = nextChars.slice(0, NUMBER_SLOTS).join("");
    const nextLetters = nextChars.slice(NUMBER_SLOTS).join("");
    onChange && onChange(nextNumbers, nextLetters);
  }

  function handleCellChange(index, rawValue) {
    const isLetterSlot = index >= NUMBER_SLOTS;
    const cleaned = isLetterSlot
      ? rawValue.replace(/[^a-zA-Z]/g, "").slice(-1).toUpperCase()
      : rawValue.replace(/[^0-9]/g, "").slice(-1);

    const next = [...allChars];
    next[index] = cleaned;
    commitChange(next);

    if (cleaned && index < totalSlots - 1) {
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) nextInput.focus();
    }
  }

  function handleKeyDown(index, event) {
    if (event.key === "Backspace" && !allChars[index] && index > 0) {
      const prevInput = inputRefs.current[index - 1];
      if (prevInput) prevInput.focus();
    }
  }

  function renderLatinCell(char, index) {
    const isDivider = index === NUMBER_SLOTS - 1;
    const cellClass = `plateCell plateCell--latin${isDivider ? " plateCell--divider" : ""}`;

    if (!editing || disabled) {
      return (
        <div key={`latin-${index}`} className={cellClass}>
          {char || ""}
        </div>
      );
    }

    return (
      <input
        key={`latin-${index}`}
        ref={(el) => (inputRefs.current[index] = el)}
        className={cellClass}
        value={char}
        maxLength={1}
        inputMode={index < NUMBER_SLOTS ? "numeric" : "text"}
        onChange={(e) => handleCellChange(index, e.target.value)}
        onKeyDown={(e) => handleKeyDown(index, e)}
      />
    );
  }

  function renderArabicCell(char, index) {
    const isDivider = index === NUMBER_SLOTS - 1;
    const isLetterSlot = index >= NUMBER_SLOTS;
    const display = isLetterSlot ? toArabicLetter(char) : toArabicDigit(char);
    const cellClass = `plateCell plateCell--arabic${isDivider ? " plateCell--divider" : ""}`;

    return (
      <div key={`arabic-${index}`} className={cellClass}>
        {display}
      </div>
    );
  }

  return (
    <div className="plateWrap">
      {!disabled && (
        <button
          type="button"
          className="plateEditBtn"
          aria-label={editing ? "Done editing plate" : "Edit plate"}
          onClick={() => setEditing((prev) => !prev)}
        >
          {editing ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M4 12l5 5L20 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      )}

      <div className="plate">
        <div className="plateGrid">
          {allChars.map((char, index) => renderArabicCell(char, index))}
          {allChars.map((char, index) => renderLatinCell(char, index))}
        </div>
        <div className="plateKsa">
          <span className="plateKsaLabel">KSA</span>
          <svg className="plateKsaFlag" width="16" height="11" viewBox="0 0 16 11" fill="none">
            <rect width="16" height="11" rx="1" fill="#0B6E4F" />
            <rect x="2" y="4.5" width="8" height="1.2" fill="#fff" />
          </svg>
        </div>
      </div>
    </div>
  );
}