import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../context/appContext";
import { Star } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

function Hotel() {
  const { hotelId } = useParams();
  const { api } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hotel, setHotel] = useState(null);

  // handling params data
  const [params] = useSearchParams();

  const checkIn = params.get("checkIn");
  const checkOut = params.get("checkOut");
  const guests = params.get("guests");
  const rooms = params.get("rooms");

  // Calculating the total nights
  const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));

  const fetchHotel = async () => {
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
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
      setError("Server not responding...");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotel();
  }, []);

  // Handling Loading state //
  if (loading)
    return (
      <div className="text-center">
        <p className="text-blue-600 font-bold text-lg">Loading Data...</p>
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
    <div className="mx-auto max-w-6xl px-4 pt-12 mb-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white rounded-2xl shadow-lg p-6 mt-5">
        {/* Hotel details */}
        {hotel && (
          <div className="lg:col-span-2 flex flex-col gap-2">
            <img src={hotel.hotelImage?.url} alt={hotel.name} className="w-full h-[350px] object-cover rounded-xl " />
            <div className="flex flex-col md:flex-row gap-3 mb-5">
              {hotel.roomImages?.map((img, i) => (
                <img key={i} src={img.url} className="w-[340px] rounded-lg object-cover " alt={`Room ${i + 1}`} />
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-bold text-gray-900">{hotel.name}</h2>

              <p className="text-gray-600 leading-relaxed">{hotel.description}</p>

              <p className="text-sm text-gray-600">📍 {hotel.location}</p>
            </div>
          </div>
        )}

        {/* Booking / payment card */}
        <div className="flex flex-col gap-6 border border-gray-200 rounded-xl p-5 h-fit sticky top-24">
          <div>
            <div>
              <div className="flex justify-between font-semibold text-md">
                <p>Check-In</p>
                <p>Check-Out</p>
              </div>
              <div className="flex justify-between text-sm  text-green-500 font-semibold mt-[-5px]">
                <p>{checkIn && checkIn !== "null" && checkIn !== "undefined" ? checkIn : "Please select a Date"}</p>
                <p>{checkOut && checkOut !== "null" && checkOut !== "undefined" ? checkOut : "Please select a Date"}</p>
              </div>
            </div>
            <div>
              <p className="text-md font-semibold">
                Number of Guests:
                <span className="ml-2 text-md text-green-500 font-semibold">
                  {guests && guests !== "null" && guests !== "undefined" ? guests : 0}
                </span>
              </p>
              <p className="text-md font-semibold ">
                Number of Rooms:
                <span className="ml-2 text-md text-green-500 font-semibold">
                  {rooms && rooms !== "null" && rooms !== "undefined" ? guests : 0}
                </span>
              </p>
            </div>
            <div className="flex flex-col  justify-between">
              <p className="font-semibold text-md ">
                Number of nights :
                <span className="text-green-500 ml-2">
                  {nights && nights !== "undefined" && nights !== "null" ? nights : 0}
                </span>
              </p>
              <p className="text-md font-semibold ">
                Price per night: <span className="text-green-500 font-semibold">₹{hotel?.pricePerNight}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 ">
            {Array.from({ length: hotel?.rating || 0 }).map((_, i) => (
              <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
            ))}
          </div>

          {hotel && (
            <Link
              to={`/booknow/${hotel?._id}?hotelName=${hotel.name}&&checkIn=${checkIn}&&checkOut=${checkOut}&&guests=${guests}&&rooms=${rooms}&&nights=${nights}&&price=${hotel.pricePerNight}`}
            >
              <button className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-xl font-semibold transition">
                Book now
              </button>
            </Link>
          )}

          <p className="text-xs text-gray-500 text-center">Free cancellation </p>
        </div>
      </div>
    </div>
  );
}

export default Hotel;
