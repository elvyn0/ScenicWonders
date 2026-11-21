import { useState, useContext } from "react";
import BookingBar from "../components/hotels/BookingSearchBar/BookingBar";
import Hotels from "../components/hotels/Hotels";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";

function HotelsAndBookingbar() {
  const { api, hotelsList, setHotelsList } = useContext(AppContext);
  const [loading, setLoading] = useState(hotelsList.length === 0);
  const [error, setError] = useState(null);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchData, setSearchData] = useState({
    location: "",
    checkIn: null,
    checkOut: null,
    rooms: 1,
    guests: 1,
  });

  // Fetching hotels (Stale-While-Revalidate)
  const fetchHotelLists = async (isBackground = false) => {
    try {
      if (!isBackground) setLoading(true);
      setError(null);

      const response = await api.get("/api/hotels/list");
      if (response.data.success) {
        setHotelsList(response.data.hotels);
        setError(null);
      } else {
        if (!isBackground) toast.error(response.data.message);
        if (hotelsList.length === 0) setError("Failed to load data");
      }
    } catch (err) {
      console.error(err);
      if (!isBackground && hotelsList.length === 0) {
        toast.error(err.response?.data?.message || "Something went wrong");
        setError("Server not responding...");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handling search suggestions
  const handleSearch = (value) => {
    if (!value) {
      setFilteredHotels([]);
      setShowSuggestions(false);
      return;
    }

    const results = hotelsList.filter(
      (hotel) =>
        hotel.name.toLowerCase().includes(value.toLowerCase()) ||
        hotel.location.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredHotels(results);
    setShowSuggestions(true);
  };

  // Search availability for hotels based on searched data
  const handleSearchHotels = async () => {
    try {
      const response = await api.get("/api/hotels/search", {
        params: searchData,
      });

      if (response.data.success) {
        setHotelsList(response.data.hotels);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // Handling error state //
  if (error)
    return (
      <div className="text-center text-lg text-red-600 font-bold">
        <p>{error}</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-5 p-3 items-center justify-center">
      <div>
        <BookingBar
          setShowSuggestions={setShowSuggestions}
          handleSearch={handleSearch}
          handleSearchHotels={handleSearchHotels}
          searchData={searchData}
          setSearchData={setSearchData}
        />
      </div>

      <div>
        <Hotels
          fetchHotelLists={fetchHotelLists}
          loading={loading}
          hotelsList={hotelsList}
          handleSearch={handleSearch}
          showSuggestions={showSuggestions}
          filteredHotels={filteredHotels}
          setShowSuggestions={setShowSuggestions}
          searchData={searchData}
        />
      </div>
    </div>
  );
}

export default HotelsAndBookingbar;
