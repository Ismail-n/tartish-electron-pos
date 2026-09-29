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

export function toArabicDigit(char) {
  if (char === "" || char == null) return "";
  const digit = Number(char);
  return Number.isNaN(digit) ? "" : ARABIC_DIGITS[digit];
}

export function toArabicLetter(char) {
  if (!char) return "";
  return LATIN_TO_ARABIC_LETTER[char.toUpperCase()] || "";
}

export { ARABIC_DIGITS, LATIN_TO_ARABIC_LETTER };
