import { useEffect } from "react";
import HotelItems from "./HotelItems";

function Hotels({
  fetchHotelLists,
  showSuggestions,
  filteredHotels,
  setSearchQuery,
  setShowSuggestions,
  hotelsList,
  loading,
}) {
  const hotelsToDisplay = showSuggestions && filteredHotels.length > 0 ? filteredHotels : hotelsList;

  useEffect(() => {
    fetchHotelLists();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 ">
      {loading ? (
        <p className="text-blue-700 font-semibold text-lg">Hotels are Loading....</p>
      ) : (
        <div>
          {hotelsToDisplay.map((item) => (
            <div
              key={item._id}
              onClick={() => {
                setSearchQuery(item.name);
                setShowSuggestions(false);
              }}
            >
              <HotelItems
                id={item._id}
                image={item.hotelImage?.url}
                name={item.name}
                location={item.location}
                rating={item.rating}
                pricePerNight={item.pricePerNight}
                destination={item.destination}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Hotels;

{
  /**
  
  hotelsList.map((item) => (
            <HotelItems
              key={item._id}
              id={item._id}
              image={item.hotelImage?.url}
              name={item.name}
              location={item.location}
              rating={item.rating}
              pricePerNight={item.pricePerNight}
              destination={item.destination}
  */
}
