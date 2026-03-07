import { useEffect, useRef, useState } from "react";
import Calendar from "./Calendar";
import SearchBar from "./SearchBar";

function BookingBar({ setShowSuggestions, handleSearch, handleSearchHotels, searchData, setSearchData }) {
  const calendarRef = useRef();

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState({ checkIn: null, checkOut: null });

  useEffect(() => {
    function handleClickOutside(e) {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative  w-full max-w-5xl mx-auto border-2 rounded-xl bg-white shadow-sm">
        <SearchBar
          setShowCalendar={setShowCalendar}
          selectedDate={selectedDate}
          setShowSuggestions={setShowSuggestions}
          handleSearch={handleSearch}
          handleSearchHotels={handleSearchHotels}
          searchData={searchData}
          setSearchData={setSearchData}
        />
      </div>
      {showCalendar && (
        <div ref={calendarRef} className="bg-white p-4 max-w-5xl rounded-xl shadow-lg mt-1">
          <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} setShowCalendar={setShowCalendar} />
        </div>
      )}
    </div>
  );
}

export default BookingBar;
