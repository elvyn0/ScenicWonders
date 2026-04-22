import { Star } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { formatDate } from "../../../utils/formatDate";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

function HotelSummery() {
  const { hotelId } = useParams();
  const { api } = useContext(AppContext);
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [params] = useSearchParams();
  const checkIn = params.get("checkIn");
  const checkOut = params.get("checkOut");
  const guests = params.get("guests");
  const rooms = params.get("rooms");
  const nights = params.get("nights");

  // Fetch Hotel by Id
  const fetchhotel = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get(`/api/hotels/${hotelId}`);
      if (response.data.success) {
        setHotel(response.data.hotel);
        setError(null);
      } else {
        toast.error(response.data.message);
        setError("Failed to load data");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
      setError("Server not responding...");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchhotel();
  }, [hotelId]);

  // Handling Loading state //
  if (loading)
    return (
      <div className="text-center">
        <p className="text-blue-600 font-bold text-sm">Loading Booking Data...</p>
      </div>
    );
  // Handling error state //
  if (error)
    return (
      <div className="text-center text-lg text-red-600 font-bold">
        <p>{error}</p>
      </div>
    );

  return (
    <div>
      {hotel && (
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-5">
          {/* Title */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Almost done!</h2>
            <p className="text-gray-600 text-sm">Enter your details and complete your booking.</p>
          </div>

          {/* Hotel Info */}
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="sm:w-40 flex-shrink-0">
              <img src={hotel.hotelImage?.url} className="w-full h-32 object-cover rounded-xl" />
            </div>

            <div className="flex flex-col justify-between w-full">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{hotel.name}</h3>

                <p className="text-sm text-gray-600 mt-1">📍 {hotel.location}</p>

                <div className="flex items-center gap-1 mt-2">
                  {Array.from({ length: hotel?.rating || 0 }).map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">{hotel.rating?.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Check-in</p>
                <p className="font-medium text-gray-800">{formatDate(checkIn)}</p>
              </div>

              <div>
                <p className="text-gray-500">Check-out</p>
                <p className="font-medium text-gray-800">{formatDate(checkOut)}</p>
              </div>

              <div>
                <p className="text-gray-500">Guests</p>
                <p className="font-medium text-gray-800">{guests || 0}</p>
              </div>

              <div>
                <p className="text-gray-500">Rooms</p>
                <p className="font-medium text-gray-800">{rooms || 0}</p>
              </div>
              <div>
                <p className="text-gray-500">Nights</p>
                <p className="font-medium text-gray-800">{nights && nights !== "NaN" ? nights : 0}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HotelSummery;
