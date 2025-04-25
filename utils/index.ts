export const numberWithCommas = (
  number = "",
  digits = 2,
  showZeroDecimal = false,
  showFullDigit = false
) => {
  if (!number) return showZeroDecimal ? parseFloat("0").toFixed(digits) : "0";
  const textNumber = showFullDigit
    ? parseFloat(number).toString()
    : parseFloat(number).toFixed(digits);

  const parts = textNumber.split(".");
  if (!parts.length) return "0";
  if (parts.length === 2) {
    const decimal =
      parseInt(parts[1]) === 0 && !showZeroDecimal ? "" : `.${parts[1]}`;
    return parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + decimal;
  }

  return parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatCurrency = (
  value = 0,
  currency = "",
  digits = 2,
  isRound = false,
  showZeroDecimal = false
) => {
  const finalValue = isRound ? roundAmount(value) : value;
  return ` ${numberWithCommas(String(finalValue), digits, showZeroDecimal)} ${
    currency || ""
  }`;
};

export const roundAmount = (amount: number, step = 0.5) => {
  return Math.ceil(amount - step);
};
