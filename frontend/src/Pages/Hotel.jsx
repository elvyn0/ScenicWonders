import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../context/appContext";
import { Star } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import toast from "react-hot-toast";

function Hotel() {
  const { hotelId } = useParams();
  const { api } = useContext(AppContext);
  const [hotel, setHotel] = useState(null);

  // handling params data
  const [params] = useSearchParams();

  const checkIn = params.get("checkIn");
  const checkOut = params.get("checkOut");
  const guests = params.get("guests");
  const rooms = params.get("rooms");

  const fetchHotel = async () => {
    try {
      const response = await api.get(`/api/hotels/${hotelId}`);
      if (response.data.success) {
        setHotel(response.data.hotel);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchHotel();
  }, [hotelId]);

  return (
    <div className="mx-auto max-w-6xl px-4 pt-12 mb-5">
      {/* Booking searchbar */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white rounded-2xl shadow-lg p-6 mt-5">
        {/* Hotel details */}
        {hotel && (
          <div className="lg:col-span-2 flex flex-col gap-2">
            <img src={hotel.hotelImage?.url} alt={hotel.name} className="w-full h-[350px] object-cover rounded-xl " />
            <div className="flex gap-3 mb-5">
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
              <div className="flex justify-between font-bold text-lg">
                <p>Check-In</p>
                <p>Check-Out</p>
              </div>
              <div className="flex justify-between text-sm  text-green-500 font-semibold mt-[-5px]">
                <p>{checkIn && checkIn !== "null" && checkIn !== "undefined" ? checkIn : "Please select a Date"}</p>
                <p>{checkOut && checkOut !== "null" && checkOut !== "undefined" ? checkOut : "Please select a Date"}</p>
              </div>
            </div>
            <div>
              <p className="text-lg font-bold">
                Number of Guests:
                <span className="ml-2 text-md text-green-500 font-semibold">
                  {guests && guests !== "null" && guests !== "undefined" ? guests : 0}
                </span>
              </p>
              <p className="text-lg font-bold">
                Number of Rooms:
                <span className="ml-2 text-md text-green-500 font-semibold">
                  {rooms && rooms !== "null" && rooms !== "undefined" ? guests : 0}
                </span>
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-gray-800">
                Price per night: <span className="text-green-500 font-semibold">₹{hotel?.pricePerNight}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 ">
            {Array.from({ length: hotel?.rating || 0 }).map((_, i) => (
              <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
            ))}
          </div>

          <Link
            to={`/booknow/${hotel?._id}?checkIn=${checkIn}&&checkOut=${checkOut}&&guests=${guests}&&rooms=${rooms}`}
          >
            <button className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-xl font-semibold transition">
              Book now
            </button>
          </Link>

          <p className="text-xs text-gray-500 text-center">Free cancellation </p>
        </div>
      </div>
    </div>
  );
}

export default Hotel;
