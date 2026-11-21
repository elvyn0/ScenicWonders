import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import WeekendDealsItem from "./WeekenddealItem";
import toast from "react-hot-toast";

function WeekendDeals() {
  const { api, hotelsList, setHotelsList } = useContext(AppContext);
  const [loading, setLoading] = useState(hotelsList.length === 0);
  const [error, setError] = useState(null);

  // Fetching hotels (Stale-While-Revalidate)
  useEffect(() => {
    const fetchList = async (isBackground = false) => {
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

    fetchList(hotelsList.length > 0);
  }, []);

  // Handling error state when no data exists //
  if (error && hotelsList.length === 0)
    return (
      <div className="text-center text-sm text-red-600 font-bold">
        <p>{error}</p>
      </div>
    );

  // Filtering hotels by weekend Deals
  const weekendDeals = hotelsList.filter((item) => item.weekendDeals === true).slice(0, 4);

  return (
    <div className="bg-gray-200 py-10 px-6 mb-5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex  items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold text-gray-900">Weekend Deals</h2>

          <Link
            to="/hotels-bookings"
            className="text-lg font-medium text-gray-600 hover:text-black transition no-underline"
          >
            Explore more →
          </Link>
        </div>

        {/* Content */}
        {loading && weekendDeals.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-pulse">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-3 shadow-lg min-w-[260px]">
                <div className="h-40 w-full bg-gray-200 rounded-t-2xl" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : weekendDeals.length === 0 ? (
          <p className="text-center text-gray-500">No weekend deals available right now.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {weekendDeals.map((item) => (
              <WeekendDealsItem
                key={item._id}
                id={item._id}
                name={item.name}
                image={item.hotelImage?.url}
                pricePerNight={item.pricePerNight}
                destination={item.location}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default WeekendDeals;
