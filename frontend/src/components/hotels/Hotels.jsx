import { useEffect, useState } from "react";
import HotelItems from "./HotelItems";
import { Bot } from "lucide-react";
import AiBot from "../common/Ai/AiBot";

function Hotels({
  fetchHotelLists,
  showSuggestions,
  setShowSuggestions,
  filteredHotels,
  hotelsList,
  loading,
  searchData,
}) {
  const [aiOpen, setAiOpen] = useState(false);

  const hotelsToDisplay = showSuggestions && filteredHotels.length > 0 ? filteredHotels : hotelsList;

  useEffect(() => {
    fetchHotelLists(hotelsList.length > 0);
  }, []);

  return (
    <div>
      {/* Floating Button */}
      <div>
        {!aiOpen && (
          <button
            onClick={() => setAiOpen(true)}
            className="fixed bottom-20 right-8 bg-blue-500 text-white p-3 rounded-full z-[50] hover:bg-blue-600 transition-all"
          >
            <Bot />
          </button>
        )}
        <AiBot aiOpen={aiOpen} setAiOpen={setAiOpen} />
      </div>

      {loading && hotelsToDisplay.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-pulse">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col md:flex-row bg-white rounded-lg shadow-md p-4 gap-4">
              <div className="w-full md:w-[300px] h-[200px] bg-gray-200 rounded-md" />
              <div className="flex-1 space-y-3 pt-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {hotelsToDisplay.map((item) => (
            <div
              key={item._id}
              onClick={() => {
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
                searchData={searchData}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Hotels;
