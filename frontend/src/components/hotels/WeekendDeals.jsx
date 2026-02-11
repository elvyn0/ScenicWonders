import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/appContext";
import { Link } from "react-router-dom";
import WeekendDealsItem from "./WeekenddealItem";
import toast from "react-hot-toast";

function WeekendDeals() {
  const { api } = useContext(AppContext);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await api.get("/api/hotels/list");

        if (response.data.success) {
          setHotels(response.data.hotels);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchList();
  }, [api]);

  const weekendDeals = hotels.filter((item) => item.weekendDeals === true).slice(0, 4);

  return (
    <div className="bg-gray-50 py-16 px-6 mt-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold text-gray-900">Weekend Deals</h2>

          <Link
            to="/HotelBookings"
            className="text-lg font-medium text-gray-600 hover:text-black transition no-underline"
          >
            Explore more →
          </Link>
        </div>

        {/* Content */}
        {loading ? (
          <p className="text-center text-gray-500">Loading deals...</p>
        ) : weekendDeals.length === 0 ? (
          <p className="text-center text-gray-500">No weekend deals available right now.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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
