import React from "react";
import { Calendar, Search, User } from "lucide-react";

function HotelSerchBar({
  activeInput,
  setActiveInput,
  destination,
  setDestination,
  guests,
  setGuests,
  checkInDisplay,
  checkOutDisplay,
  onSearchClick,
}) {
  return (
    <div>
      {/* Destination Input */}
      <div
        onClick={() => setActiveInput("destination")}
        className={`flex items-center flex-1 p-3 rounded-1 xl cursor-pointer transition duration-200 ${
          activeInput === "destination" ? "bg-orange-50 border-orange-500 shadow-inner " : "hover:bg-gray-100"
        } min-w-[200px]`}
      >
        <Search className="w-5 h-5 text-gray-500 mr-2" />
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Book Your Hotels"
          className="flex-1 bg-transparent text-gray-800 font-medium placeholder-gray-500 focus:outline-none"
        />
      </div>

      {/* Separator */}
      <div className="w-px bg-gray-200 mx-1"></div>

      {/* Dates Input (Trigger for calendar) */}
      <div
        onClick={() => setActiveInput("dates")}
        className={`flex flex-2 cursor-pointer p-3 transition duration-200 min-w-[300px] ${
          activeInput === "dates" ? "bg-orange-50 border border-orange-500 shadow-inner" : "hover:bg-gray-100"
        } flex items-center justify-between`}
      >
        <div className="text-center border-r pr-4">
          <div className="text-xs font-semibold text-gray-500 ">CHECK-IN</div>
          <div className="font-bold text-gray-900 text-sm md:text-base">{checkInDisplay}</div>
        </div>
        <Calendar className="w-5 h-5 text-gray-500 mx-4" />
        <div className="text-center pl-4">
          <div className="text-xs font-semibold text-gray-500">CHECK-OUT</div>
          <div className="font-bold text-gray-900 text-sm md:text-base">{checkOutDisplay}</div>
        </div>
      </div>
      {/* Separator */}
      <div className="w-px bg-gray-200 mx-1"></div>

      {/* Guest Input */}
      <div
        onClick={() => setActiveInput("guests")}
        className={`flex items-center flex-1 p-3 cursor-pointer transition duration-200 ${
          activeInput === "guests" ? "bg-orange-50 border border-orange-500 shadow-inner" : "hover:bg-gray-100"
        } min-w-[150px]`}
      >
        <User className="w-5 h-5 text-gray-500 mr-2" />
        <input
          type="text"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          placeholder="Add Guests"
          className="flex-1 bg-transparent text-gray-800 font-medium placeholder-gray-500 focus:outline-none"
        />
      </div>
      {/* Search Button */}
      <button
        onClick={onSearchClick}
        className="flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-r-xl transition duration-200 shadow-md"
      >
        Search
      </button>
    </div>
  );
}

export default HotelSerchBar;
