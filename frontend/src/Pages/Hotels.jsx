import React, { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { MONTHS, today, currentYear, currentMonthIndex } from "../utils/hotelBookingUtils";
import HotelSerchBar from "../Components/HotelSerchBar";
import CalendarGrid from "../Components/CalendarGrid";

function Hotels() {
  const [guests, setGuests] = useState("Add Guests");
  const [selectedDates, setSeclectedDates] = useState({ checkIn: null, checkOut: null });
  const [activeInput, setActiveInput] = useState(null);
  const [destination, setDestination] = useState("Book Your Hotels");

  // Date click Handler
  const handleDateClick = (date) => {
    const { checkIn, checkOut } = selectedDates;

    // Prevent selecting dates in the past
    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0);

    if (date < todayMidnight) {
      toast.error("Cannot select a past date");
      return;
    }

    if (checkIn && checkOut) {
      setSeclectedDates({ checkIn: date, checkOut: null });
    } else if (checkIn && date > checkIn) {
      setSeclectedDates((prev) => ({ ...prev, checkOut: date }));
      setActiveInput(null);
    } else {
      setSeclectedDates({ checkIn: date, checkOut: null });
    }
  };

  // function for date formatting
  const formatDate = (date) => {
    if (!date) return "";

    const day = date.getDate();
    const month = MONTHS[date.getMonth()].substring(0, 3);
    return `${month} ${day}`;
  };

  const getWeekday = (date) => {
    if (!date) return "";
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return weekdays[date.getDay()];
  };

  // Format dates for display in the SearchBar

  const checkInDisplay = selectedDates.checkIn
    ? `${getWeekday(selectedDates.checkIn)}  ${formatDate(selectedDates.checkIn)}`
    : "Check In";
  const checkOutDisplay = selectedDates.checkOut
    ? `${getWeekday(selectedDates.checkOut)} ${formatDate(selectedDates.checkOut)}`
    : "Check Out";

  // The two months to display start with the current month
  const monthsToDisplay = useMemo(() => {
    const nextMonthDate = new Date(today);
    nextMonthDate.setMonth(currentMonthIndex + 1);

    return [
      { year: currentYear, monthIndex: currentMonthIndex },
      { year: nextMonthDate.getFullYear(), monthIndex: nextMonthDate.getMonth() },
    ];
  }, []);

  const handleSearchClick = () => {
    // In a real application, this is where you would handle routing/API calls
    console.log("--- SEARCH TRIGGERED ---");
    console.log("Destination:", destination);
    console.log("Check-in:", selectedDates.checkIn ? selectedDates.checkIn.toDateString() : "N/A");
    console.log("Check-out:", selectedDates.checkOut ? selectedDates.checkOut.toDateString() : "N/A");
    console.log("Guests:", guests);
    setActiveInput(null); // Close any active input/calendar after search
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 pt-10 font-sans">
      <style>{`body{font-family:'Inter',sams-serif}`}</style>
      <div className="relative w-full max-w-5xl mx-auto">
        {/* Hotel SerchBar component */}
        <HotelSerchBar
          activeInput={activeInput}
          setActiveInput={setActiveInput}
          destination={destination}
          setDestination={setDestination}
          guests={guests}
          setGuests={setGuests}
          checkInDisplay={checkInDisplay}
          checkOutDisplay={checkOutDisplay}
          onSearchClick={handleSearchClick}
        />

        {/* CalendarGrid component */}
        {activeInput === "dates" && (
          <CalendarGrid
            monthsToDisplay={monthsToDisplay}
            selectedDates={selectedDates}
            handleDateClick={handleDateClick}
            activeInput={activeInput}
          />
        )}
      </div>
    </div>
  );
}

export default Hotels;
