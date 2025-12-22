import React, { useMemo, useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { MONTHS, today, currentMonthIndex } from "../utils/hotelBookingUtils";
import HotelSerchBar from "../components/hotels/HotelSerchBar";
import CalendarGrid from "../components/hotels/CalendarGrid";
import Hotels from "../components/hotels/Hotels";
import { AppContext } from "../context/appContext";

function HotelBookings() {
  const { search, setSearch } = useContext(AppContext);

  const [guests, setGuests] = useState("");
  const [selectedDates, setSeclectedDates] = useState({ checkIn: null, checkOut: null });
  const [activeInput, setActiveInput] = useState(null);

  const [startMonthOffset, setstartMonthOffset] = useState(0);

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
    const firstMonth = new Date(today);
    firstMonth.setMonth(currentMonthIndex + startMonthOffset);

    const secondMonth = new Date(firstMonth);
    secondMonth.setMonth(currentMonthIndex + startMonthOffset + 1);

    return [
      { year: firstMonth.getFullYear(), monthIndex: firstMonth.getMonth() },
      { year: secondMonth.getFullYear(), monthIndex: secondMonth.getMonth() },
    ];
  }, [startMonthOffset]);

  // Calendar navigation Handler
  const handleNextMonth = () => {
    setstartMonthOffset((prev) => prev + 1);
  };
  const handlePrevMonth = () => {
    setstartMonthOffset((prev) => Math.max(0, prev - 1));
  };

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
    <div className="bg-gray-100">
      <div className="  mb-2 mt- p-5  font-sans  ">
        <style>{`
                body { font-family: 'Inter', sans-serif; }
            `}</style>

        <div className="relative  w-full max-w-5xl mx-auto border-2 rounded-xl bg-white shadow-sm">
          {/* 1. Render the SearchBar component, passing props down */}
          <HotelSerchBar
            activeInput={activeInput}
            setActiveInput={setActiveInput}
            search={search}
            setSearch={setSearch}
            guests={guests}
            setGuests={setGuests}
            checkInDisplay={checkInDisplay}
            checkOutDisplay={checkOutDisplay}
            onSearchClick={handleSearchClick}
          />

          {/* 2. Conditionally render the CalendarOverlay component, passing props down */}
          {activeInput === "dates" && (
            <div className="flex gap-4 bg-white p-4 rounded-xl shadow-lg mt-3">
              {monthsToDisplay.map((m, i) => (
                <CalendarGrid
                  key={i}
                  year={m.year}
                  monthIndex={m.monthIndex}
                  selectedDates={selectedDates}
                  handleDateClick={handleDateClick}
                  activeInput={activeInput}
                  onNextMonth={handleNextMonth}
                  onPrevMont={handlePrevMonth}
                  startMonthOffset={startMonthOffset}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <Hotels />
      </div>
    </div>
  );
}
export default HotelBookings;
