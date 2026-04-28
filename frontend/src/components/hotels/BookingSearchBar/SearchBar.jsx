import { Bed, Calendar, Search, User } from "lucide-react";
import { useEffect } from "react";

function SearchBar({
  setShowCalendar,
  selectedDate,
  setShowSuggestions,
  handleSearchHotels,
  searchData,
  setSearchData,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearchHotels();
  };

  useEffect(() => {
    setSearchData((prev) => ({
      ...prev,
      checkIn: selectedDate.checkIn?.toISOString(),
      checkOut: selectedDate.checkOut?.toISOString(),
    }));
  }, [selectedDate]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-5xl mx-auto flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden"
    >
      {/* Location Search */}
      <div className="flex items-center flex-1 px-4 py-3 min-w-0 focus-within:bg-gray-100">
        <Search className=" text-gray-500 mr-3" />
        <input
          type="text"
          placeholder=" Search location"
          value={searchData.location}
          onChange={(e) => {
            setSearchData({ ...searchData, location: e.target.value });
            setShowSuggestions(true);
          }}
          className="w-full bg-transparent text-gray-500 font-semibold placeholder-gray-400 focus:outline-none"
        />
      </div>

      {/* Divider (desktop only) */}
      <div className="hidden md:block w-px bg-gray-200"></div>

      {/* Check In / Out */}
      <div
        onClick={() => setShowCalendar(true)}
        className="flex flex-2 items-center justify-between px-4 py-3 hover:bg-gray-100 cursor-pointer"
      >
        <div className="text-center">
          <p className="text-xs text-black font-bold">CHECK-IN</p>
          <p className="font-semibold text-gray-700 text-sm">
            {selectedDate.checkIn ? selectedDate.checkIn.toLocaleDateString() : "Check In"}
          </p>
        </div>

        <Calendar className="w-5 h-5 text-gray-600 mx-4 shrink-0" />

        <div className="text-center">
          <p className="text-xs text-black font-bold">CHECK-OUT</p>
          <p className="font-semibold text-gray-700 text-sm">
            {selectedDate.checkOut ? selectedDate.checkOut.toLocaleDateString() : "Check Out"}
          </p>
        </div>
      </div>

      {/* Divider (desktop only) */}
      <div className="hidden md:block w-px bg-gray-200"></div>

      {/* Guest */}
      <div className="flex items-center flex-1 px-4 py-3 focus-within:bg-gray-100">
        <User className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Add Guests"
          value={searchData.guests}
          onChange={(e) => setSearchData({ ...searchData, guests: Number(e.target.value) })}
          className="w-full bg-transparent focus:outline-none font-semibold text-gray-500"
        />
      </div>

      {/* Divider (desktop only) */}
      <div className="hidden md:block w-px bg-gray-200"></div>

      {/* Rooms */}
      <div className="flex items-center flex-1 px-4 py-3 focus-within:bg-gray-100">
        <Bed className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Add Rooms"
          value={searchData.rooms}
          onChange={(e) => setSearchData({ ...searchData, rooms: Number(e.target.value) })}
          className="w-full bg-transparent focus:outline-none font-semibold text-gray-500"
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="bg-red-600 hover:bg-red-500
                     text-white font-semibold px-8 py-3 
                     transition duration-300"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
