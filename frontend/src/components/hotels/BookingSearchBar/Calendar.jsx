import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DAYS_OF_WEEK } from "../../../utils/hotelBookingUtils";
import toast from "react-hot-toast";

function Calendar({ selectedDate, setSelectedDate, setShowCalendar }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // move to previous and next month
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const getMonthInfo = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();

    return { daysInMonth, firstDayIndex };
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
  // To display dual month, current month and next month.
  const currentCells = generateCells(year, month);
  const nextCells = generateCells(year, month + 1);

  //  handle check-in and check-out
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
          setShowCalendar(false);
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
    <div className="min-w-[300px] flex flex-col  flex-1  gap-1 p-2 ">
      {/* Header */}
      <div className="flex  justify-between ">
        <button onClick={prevMonth}>
          <ChevronLeft size="26" className=" hover:bg-gray-200  rounded-full" />
        </button>
        <button onClick={nextMonth}>
          <ChevronRight size="26" className="hover:bg-gray-200 rounded-full" />
        </button>
      </div>
      {/* Month Grid */}
      <div className="flex flex-col md:flex-row gap-5 ">
        {/* Current month */}
        <div className="w-full">
          <h3 className="text-lg font-semibold text-black text-center mb-4">
            {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
          </h3>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-4">
            {/* Week Headers */}
            {DAYS_OF_WEEK.map((day, index) => (
              <div
                key={`headers-${index}`}
                className="flex items-center justify-center text-lg font-bold  text-black mb-1 "
              >
                {day}
              </div>
            ))}

            {/* Dates */}
            {currentCells.map((cell, index) => {
              const clickedDate = cell ? new Date(year, month, cell) : null;

              const { isCheckIn, isCheckOut, isInRange } = getDateStatus(clickedDate);

              return (
                <div
                  key={index}
                  onClick={() => cell && handleDateClick(clickedDate)}
                  className={`  flex  items-center justify-center text-sm p-1 text-gray-600 rounded-full cursor-pointer font-semibold  ${cell ? "hover:bg-gray-200" : ""} ${isCheckIn || isCheckOut ? "bg-orange-500 text-white " : ""} ${isInRange ? "bg-orange-100 text-orange-800  rounded-full hover:bg-gray-300" : ""}`}
                >
                  {cell}
                </div>
              );
            })}
          </div>
        </div>
        {/* Next month */}
        <div className="w-full">
          <h3 className="text-lg font-semibold text-black text-center mb-4">
            {new Date(year, month + 1).toLocaleString("default", { month: "long", year: "numeric" })}
          </h3>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-4  ">
            {/* Week Headers */}
            {DAYS_OF_WEEK.map((day, index) => (
              <div
                key={`headers-${index}`}
                className="flex   items-center justify-center text-lg font-bold  text-black mb-1 "
              >
                {day}
              </div>
            ))}

            {/* Dates */}
            {nextCells.map((cell, index) => {
              const clickedDate = cell ? new Date(year, month + 1, cell) : null;

              const { isCheckIn, isCheckOut, isInRange } = getDateStatus(clickedDate);
              return (
                <div
                  key={index}
                  onClick={() => cell && handleDateClick(clickedDate)}
                  className={`  flex  items-center justify-center text-sm p-1 text-gray-600  rounded-full cursor-pointer  font-semibold    ${cell ? "hover:bg-gray-200" : ""} ${isCheckIn || isCheckOut ? "bg-orange-500 text-white " : ""} ${isInRange ? "bg-orange-100 text-orange-800  rounded-full hover:bg-gray-300" : ""} `}
                >
                  {cell}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
