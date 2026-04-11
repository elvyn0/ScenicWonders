import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DAYS_OF_WEEK } from "../utils/hotelBookingUtils";
import toast from "react-hot-toast";

function BookingCalender2({ selectedDate, setSelectedDate, handleGuestsChange, handleRoomsChange, bookingInfo }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Month
  const getMonthInfo = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();

    return { daysInMonth, firstDayIndex };
  };

  // Move to previous and next month
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const generateCells = (year, month) => {
    const { daysInMonth, firstDayIndex } = getMonthInfo(year, month);

    // leading empty cells
    const cells = [];
    for (let i = 0; i < firstDayIndex; i++) {
      cells.push(null);
    }

    // actual days
    for (let day = 1; day <= daysInMonth; day++) {
      cells.push(day);
    }

    // trailing cells
    while (cells.length % 7 !== 0) {
      cells.push(null);
    }

    return cells;
  };

  // To display current month
  const currnetCells = generateCells(year, month);

  //  Handle check-in and check-out
  const handleDateClick = (clickedDate) => {
    if (!clickedDate) return;

    // Prevent selecting dates in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (clickedDate < today) {
      toast.error("Cannot select a past date");
      return;
    }

    setSelectedDate((prev) => {
      if (!prev.checkIn) {
        return { checkIn: clickedDate, checkOut: null };
      }
      if (prev.checkIn && !prev.checkOut) {
        if (clickedDate > prev.checkIn) {
          return { ...prev, checkOut: clickedDate };
        } else {
          return { checkIn: clickedDate, checkOut: null };
        }
      }
      return { checkIn: clickedDate, checkOut: null };
    });
  };

  const getDateStatus = (clickedDate) => {
    if (!clickedDate) {
      return {
        isCheckIn: false,
        isCheckOut: false,
        isInRange: false,
      };
    }

    const isCheckIn =
      selectedDate.checkIn && clickedDate && clickedDate.toDateString() === selectedDate.checkIn.toDateString();

    const isCheckOut =
      selectedDate.checkOut && clickedDate && clickedDate.toDateString() === selectedDate.checkOut.toDateString();

    const isInRange =
      selectedDate.checkIn &&
      selectedDate.checkOut &&
      clickedDate >= selectedDate.checkIn &&
      clickedDate <= selectedDate.checkOut;

    return { isCheckIn, isCheckOut, isInRange };
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      {/* Calendar */}
      <div className="w-full max-w-[400px] flex flex-col gap-2 border  p-3 shadow-sm">
        {/* Header */}
        <div className="flex justify-between items-center">
          <button onClick={prevMonth} className="p-1 rounded-full hover:bg-gray-200 transition">
            <ChevronLeft size={22} />
          </button>

          <h3 className="text-md font-semibold text-black">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h3>
          <button onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-200 transition">
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-2 text-center">
          {/* Week Headers */}
          {DAYS_OF_WEEK.map((day, index) => (
            <div key={`headers${index}`} className="text-xs font-semibold text-gray-500">
              {day}
            </div>
          ))}

          {/* Dates */}
          {currnetCells.map((cell, index) => {
            const clickDate = cell ? new Date(year, month, cell) : null;
            const { isCheckIn, isCheckOut, isInRange } = getDateStatus(clickDate);

            return (
              <div
                key={index}
                onClick={() => cell && handleDateClick(clickDate)}
                className={`
              flex items-center justify-center h-8 w-8 mx-auto
              text-sm rounded-full cursor-pointer font-medium
              ${cell ? "hover:bg-gray-200" : ""}
              ${isCheckIn || isCheckOut ? "bg-orange-500 text-white" : ""}
              ${isInRange ? "bg-orange-100 text-orange-800" : ""}
            `}
              >
                {cell}
              </div>
            );
          })}
        </div>
      </div>

      {/* Guests & Rooms */}
      <div className="mt-1 flex gap-2 w-full max-w-[400px] shadow-sm">
        <input
          type="number"
          placeholder="Guests"
          value={bookingInfo.guests}
          onChange={(e) => handleGuestsChange(Number(e.target.value))}
          className="w-1/2 border rounded-md px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400"
        />

        <input
          type="number"
          placeholder="Rooms"
          value={bookingInfo.rooms}
          onChange={(e) => handleRoomsChange(Number(e.target.value))}
          className="w-1/2 border rounded-md px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>
    </div>
  );
}

export default BookingCalender2;
