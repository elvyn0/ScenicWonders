import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

function HotelItems({ id, name, image, pricePerNight, location, rating, searchData }) {
  const { currency } = useContext(AppContext);
  const { checkIn, checkOut, guests, rooms } = searchData;

  //  Build query params
  const buildQueryParams = () => {
    const params = new URLSearchParams();

    if (checkIn) {
      params.append("checkIn", checkIn);
    }
    if (checkOut) {
      params.append("checkOut", checkOut);
    }
    if (guests > 0) {
      params.append("guests", guests);
    }
    if (rooms > 0) {
      params.append("rooms", rooms);
    }
    return params.toString();
  };
  const queryString = buildQueryParams();

  return (
    <Link className="block w-full no-underline" to={`/hotels/hotel/${id}?${queryString}`}>
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* Image */}
        <img className="w-full md:w-[300px] h-[200px] object-cover" src={image} alt={name} />

        {/* Content */}
        <div className="flex justify-between w-full p-4 gap-4">
          {/* Left */}
          <div>
            <p className="text-lg font-semibold">{name}</p>
            <p className="text-sm text-gray-500">{location}</p>

            <div className="mt-3 flex items-center gap-1">
              {Array.from({ length: Math.floor(rating) }).map((_, i) => (
                <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col justify-between items-end">
            <div>
              <p className="text-lg font-bold">
                {currency} {pricePerNight}
              </p>
              <p className="text-sm text-green-600">Free cancellation</p>
            </div>

            <button className="bg-orange-600 hover:bg-orange-700 transition px-4 py-2 text-white rounded-md text-sm font-medium">
              View
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default HotelItems;
