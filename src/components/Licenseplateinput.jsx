import React, { useRef, useState } from "react";
import "../styles/Licenseplateinput.scss";
import editLicensePlateIcon from "../assets/images/editLicencePlate.svg";
import emblemSaudiArabiaIcon from "../assets/images/emblemSaudiArabia.svg";
import checkIcon from "../assets/images/checkIcon.svg";
import {
  toArabicDigit,
  toArabicLetter,
  LATIN_TO_ARABIC_LETTER,
} from "../utils/plateTransliteration.js";

const NUMBER_SLOTS = 4;
const LETTER_SLOTS = 3;

export default function LicensePlateInput({
  numbers = "",
  letters = "",
  onChange,
  disabled = false,
  cameraFailed = true,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [draftLetters, setDraftLetters] = useState([]);
  const [draftNumbers, setDraftNumbers] = useState([]);
  const letterInputRefs = useRef([]);
  const numberInputRefs = useRef([]);

  const numberChars = Array.from(
    { length: NUMBER_SLOTS },
    (_, i) => numbers[i] || "",
  );
  const letterChars = Array.from(
    { length: LETTER_SLOTS },
    (_, i) => letters[i] || "",
  );
  function commitChange(nextNumberChars, nextLetterChars) {
    onChange && onChange(nextNumberChars.join(""), nextLetterChars.join(""));
  }

  function openModal() {
    setDraftLetters(Array.from({ length: LETTER_SLOTS }, () => ""));
    setDraftNumbers(Array.from({ length: NUMBER_SLOTS }, () => ""));
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function handleConfirm() {
    commitChange(draftNumbers, draftLetters);
    setModalOpen(false);
  }

  function handleLetterChange(index, rawValue) {
    const upper = rawValue.slice(-1).toUpperCase();
    const cleaned = LATIN_TO_ARABIC_LETTER[upper] ? upper : "";

    const next = [...draftLetters];
    next[index] = cleaned;
    setDraftLetters(next);

    if (cleaned && index < LETTER_SLOTS - 1) {
      const nextInput = letterInputRefs.current[index + 1];
      if (nextInput) nextInput.focus();
    }
  }

  function handleNumberChange(index, rawValue) {
    const cleaned = rawValue.replace(/[^0-9]/g, "").slice(-1);

    const next = [...draftNumbers];
    next[index] = cleaned;
    setDraftNumbers(next);

    if (cleaned && index < NUMBER_SLOTS - 1) {
      const nextInput = numberInputRefs.current[index + 1];
      if (nextInput) nextInput.focus();
    }
  }

  function handleLetterKeyDown(index, event) {
    if (event.key === "Backspace" && !draftLetters[index] && index > 0) {
      const prevInput = letterInputRefs.current[index - 1];
      if (prevInput) prevInput.focus();
    }
  }

  function handleNumberKeyDown(index, event) {
    if (event.key === "Backspace" && !draftNumbers[index] && index > 0) {
      const prevInput = numberInputRefs.current[index - 1];
      if (prevInput) prevInput.focus();
    }
  }

  function renderLatinCell(char, index) {
    const isDivider = index === NUMBER_SLOTS - 1;
    const cellClass = `plateCell plateCell--latin${isDivider ? " plateCell--divider" : ""}`;

    return (
      <div key={`latin-${index}`} className={cellClass}>
        {char || ""}
      </div>
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

  function renderPlatePreview(letterCells, numberCells) {
    const previewChars = [...numberCells, ...letterCells];
    return (
      <div className="plateWrapInner">
        <div className="plate">
          <div className="plateGrid">
            {previewChars.map((char, index) => renderArabicCell(char, index))}
            {previewChars.map((char, index) => renderLatinCell(char, index))}
          </div>
          <div className="plateKsa">
            <img
              src={emblemSaudiArabiaIcon}
              alt="Tartish"
              className="headingLogo"
            />
            <div className="plateKSAEmblemName">السعودية</div>

            <span className="plateKsaLabel">KSA</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="plateWrap">
      {renderPlatePreview(letterChars, numberChars)}
      {!disabled && (
        <button
          type="button"
          className="plateEditBtn"
          aria-label="Edit plate"
          onClick={openModal}
        >
          <img
            src={editLicensePlateIcon}
            alt="Tartish"
            className="edit_license_plate"
          />
        </button>
      )}

      {modalOpen && (
        <div className="plateModalOverlay" onClick={closeModal}>
          <div className="plateModal" onClick={(e) => e.stopPropagation()}>
            <div className="plateModalHeader">
              <h2 className="plateModalTitle">Enter Plate Manually</h2>
              {cameraFailed && (
                <span className="plateModalBadge">
                  <span className="plateModalBadgeDot" />
                  Camera read failed
                </span>
              )}
            </div>

            <div className="plateModalField">
              <div className="plateModalLabel">
                Plate Letters ({LETTER_SLOTS})
              </div>
              <div className="plateModalRow">
                {draftLetters.map((char, index) => (
                  <input
                    key={`draft-letter-${index}`}
                    ref={(el) => (letterInputRefs.current[index] = el)}
                    className="plateModalInput"
                    value={char}
                    placeholder="A"
                    maxLength={1}
                    inputMode="text"
                    onChange={(e) => handleLetterChange(index, e.target.value)}
                    onKeyDown={(e) => handleLetterKeyDown(index, e)}
                  />
                ))}
              </div>
            </div>

            <div className="plateModalField">
              <div className="plateModalLabel">
                Plate Number ({NUMBER_SLOTS})
              </div>
              <div className="plateModalRow">
                {draftNumbers.map((char, index) => (
                  <input
                    key={`draft-number-${index}`}
                    ref={(el) => (numberInputRefs.current[index] = el)}
                    className="plateModalInput"
                    value={char}
                    placeholder={String(index + 1)}
                    maxLength={1}
                    inputMode="numeric"
                    onChange={(e) => handleNumberChange(index, e.target.value)}
                    onKeyDown={(e) => handleNumberKeyDown(index, e)}
                  />
                ))}
              </div>
            </div>

            <div className="plateModalPreview">
              {renderPlatePreview(draftLetters, draftNumbers)}
            </div>

            <div className="plateModalActions">
              <button
                type="button"
                className="plateModalBtn plateModalBtn--cancel"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="plateModalBtn plateModalBtn--confirm"
                onClick={handleConfirm}
              >
                Confirm &amp; Submit
                <img src={checkIcon} alt="" className="plateModalBtnIcon" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
