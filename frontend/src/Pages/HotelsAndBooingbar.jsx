import { useState, useContext } from "react";
import BookingBar from "../components/hotels/BookingSearchBar/BookingBar";
import Hotels from "../components/hotels/Hotels";
import toast from "react-hot-toast";
import { AppContext } from "../context/appContext";

function HotelsAndBookingbar() {
  const { api } = useContext(AppContext);
  const [hotelsList, setHotelsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchData, setSearchData] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    rooms: 0,
    guests: 0,
  });

  // Fetching hotels //
  const fetchHotelLists = async () => {
    try {
      const response = await api.get("/api/hotels/list");
      if (response.data.success) {
        setHotelsList(response.data.hotels);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

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
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col gap-5 p-5 items-center justify-center">
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
