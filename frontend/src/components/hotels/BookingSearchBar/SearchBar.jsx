import { Calendar, Search, User } from "lucide-react";
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
      checkIn: selectedDate.checkIn?.toISOString().split("T")[0],
      checkOut: selectedDate.checkOut?.toISOString().split("T")[0],
    }));
  }, [selectedDate]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-5xl mx-auto 
                 flex flex-col md:flex-row 
                 bg-white rounded-xl shadow-md overflow-hidden"
    >
      {/* Hotel Search */}
      <div className="flex items-center flex-1 pl-3 min-w-0">
        <Search className=" text-gray-500 mr-3" />
        <input
          type="text"
          placeholder=" Search hotels or location"
          value={searchData.location}
          onChange={(e) => {
            setSearchData({ ...searchData, location: e.target.value });
            setShowSuggestions(true);
          }}
          className="w-full bg-transparent text-gray-800 
                 font-medium placeholder-gray-500 
                 focus:outline-none py-3 "
        />
      </div>

      {/* Divider (desktop only) */}
      <div className="hidden md:block w-px bg-gray-200"></div>

      {/* Check In / Out */}
      <div
        onClick={() => setShowCalendar(true)}
        className="flex flex-1 items-center justify-between px-4 pt-2 min-w-0 hover:bg-gray-200 cursor-pointer"
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
      <div className="flex items-center flex-1 px-4 min-w-0 ml-10">
        <User className="w-5 h-5 text-gray-500 mr-3" />
        <input
          type="text"
          placeholder=" Add Guests"
          value={searchData.guests}
          onChange={(e) => setSearchData({ ...searchData, guests: Number(e.target.value) })}
          className="w-full bg-transparent text-gray-800 
                 font-medium placeholder-gray-500 
                 focus:outline-none p-2"
        />
      </div>

      {/* Rooms */}
      <div className="flex items-center flex-1 px-4 min-w-0">
        <User className="w-5 h-5 text-gray-500 mr-3" />
        <input
          type="text"
          placeholder="Number of rooms"
          value={searchData.rooms}
          onChange={(e) => setSearchData({ ...searchData, rooms: Number(e.target.value) })}
          className="w-full bg-transparent text-gray-800 
                 font-medium placeholder-gray-500 
                 focus:outline-none p-2"
        />
      </div>

      {/* Button */}
      <button
        type="submit"
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
