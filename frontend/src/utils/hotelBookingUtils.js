export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const DAYS_OF_WEEK = ["S", "M", "T", "W", "T", "F", "S"];

export const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
export const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

// current date and target months
export const today = new Date();
export const currentYear = today.getFullYear();
export const currentMonthIndex = today.getMonth();
