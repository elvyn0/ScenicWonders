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
    fetchHotelLists();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 ">
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

      {loading ? (
        <p className="text-blue-700 font-semibold text-lg">Hotels are Loading....</p>
      ) : (
        <div>
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
