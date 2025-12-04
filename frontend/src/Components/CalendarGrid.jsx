import { useMemo } from "react";
import { MONTHS, DAYS_OF_WEEK, getDaysInMonth, getFirstDayOfMonth } from "../utils/hotelBookingUtils";

function CalendarGrid({ year, monthIndex, selectedDates, handleDateClick, activeInput }) {
  const daysInMonth = getDaysInMonth(year, monthIndex);
  const firstDay = getFirstDayOfMonth(year, monthIndex);
  const monthName = MONTHS[monthIndex];

  const allDays = useMemo(() => {
    const days = [];
    // Add leading empty cells for padding
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    // Add actual dates
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  }, [year, monthIndex, daysInMonth, firstDay]);

  const { checkIn, checkOut } = selectedDates;

  // To check if a date falls within the selected range

  const isDateInRange = (date) => {
    if (!checkIn) {
      return false;
    }

    const dateMs = date.getTime();
    const checkInMs = date.getTime();
    const checkOutMs = checkOut ? checkOut.getTime() : null;

    if (checkOutMs) {
      return dateMs > checkInMs && dateMs < checkOutMs;
    }
    return false;
  };

  // To get selected or range styles

  const getSelectedStyles = (day) => {
    if (day === null) return "";
    const date = new Date(year, monthIndex, day);

    const isCheckIn = checkIn && date.toDateString() === checkIn.toDateString();
    const isCheckOut = checkOut && date.toDateString() === checkOut.toDateString();
    const isInRange = isDateInRange(date);

    let classes = "text-gray-900 hover:bg-gray-100";

    if (isCheckIn || isCheckOut) {
      classes = "bg-orange-500 text-white font-semibold shadow-lg relative z-10";
      if (isCheckIn && !isCheckOut && checkOut) classes += "rounded-r-none";
      if (isCheckOut && checkIn) classes += "rounded-l-none";
      if (isCheckIn && isCheckOut) classes += "rounded-full";
    } else if (isInRange) {
      classes = "bg-orange-100 text-orange-800 rounded-none";
    } else {
      // Handle base rounded corners for non-range days
      classes += "rounded-full";
    }
    return classes;
  };

  return (
    <div className="flex flex-col flex-1 min-w-[300px] p-2">
      <h3 className="text-lg font-semibold text-gray-700 text-center mb-4">
        {monthName} {year}
      </h3>
      <div className="grid grid-cols-7 gap-1">
        {/* Day of week headers */}
        {DAYS_OF_WEEK.map((day, index) => (
          <div key={`headers-${index}`} className="text-center text-sm font-medium  text-gray-500">
            {day}
          </div>
        ))}

        {/* Dates Grid */}
        {allDays.map((day, index) => (
          <div key={index} className="aspect-square flex items-center justify-center">
            {day !== null && (
              <button
                onClick={() => handleDateClick(new Date(year, monthIndex, day))}
                disabled={activeInput !== "dates"}
                className={`w-10 h-10 text-sm transition-all duration-150 ${getSelectedStyles(day)}`}
              >
                {day}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarGrid;
