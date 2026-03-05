import { Calendar, Search, User } from "lucide-react";

const handelSubmit = (e) => {
  e.preventDefault();
};

function SearchBar({ setShowCalendar, selectedDate }) {
  return (
    <form
      onSubmit={handelSubmit}
      className="w-full max-w-5xl mx-auto 
                 flex flex-col md:flex-row 
                 bg-white rounded-xl shadow-md overflow-hidden"
    >
      {/* Hotel Search */}
      <div className="flex items-center flex-1 pl-3 min-w-0">
        <Search className=" text-gray-500 mr-3" />
        <input
          type="text"
          placeholder="Search Your Hotel"
          className="w-full bg-transparent text-gray-800 
                 font-medium placeholder-gray-500 
                 focus:outline-none py-3"
        />
      </div>

      {/* Divider (desktop only) */}
      <div className="hidden md:block w-px bg-gray-200"></div>

      {/* Check In / Out */}
      <div
        onClick={() => setShowCalendar(true)}
        className="flex flex-1 items-center justify-between px-4 min-w-0 hover:bg-gray-200 cursor-pointer"
      >
        <div className="text-center">
          <p className="text-xs text-gray-500 font-semibold">CHECK-IN</p>
          <p className="font-bold text-gray-900 text-sm">
            {selectedDate.checkIn ? selectedDate.checkIn.toLocaleDateString() : "Check In"}
          </p>
        </div>

        <Calendar className="w-5 h-5 text-gray-500 mx-4 shrink-0" />

        <div className="text-center">
          <p className="text-xs text-gray-500 font-semibold">CHECK-OUT</p>
          <p className="font-bold text-gray-900 text-sm">
            {selectedDate.checkOut ? selectedDate.checkOut.toLocaleDateString() : "Check Out"}
          </p>
        </div>
      </div>

      {/* Divider (desktop only) */}
      <div className="hidden md:block w-px bg-gray-200"></div>

      {/* Guest */}
      <div className="flex items-center flex-1 px-4 min-w-0">
        <User className="w-5 h-5 text-gray-500 mr-3" />
        <input
          type="text"
          placeholder="Add Guests"
          className="w-full bg-transparent text-gray-800 
                 font-medium placeholder-gray-500 
                 focus:outline-none p-3"
        />
      </div>

      {/* Button */}
      <button
        className="bg-orange-600 hover:bg-orange-700 
                     text-white font-bold px-8 py-4 
                     transition duration-200 
                     md:rounded-r-xl"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
