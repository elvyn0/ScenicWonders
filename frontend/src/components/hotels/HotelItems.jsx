import { useContext } from "react";
import { AppContext } from "../../context/appContext";
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
    <Link className=" w-full no-underline " to={`/hotels/hotel/${id}?${queryString}`}>
      <div className="flex flex-col md:flex-row text-gray-700 shadow-md bg-white p-3 mb-5 rounded-lg">
        <div>
          <img className="max-w-[300px]  max-h-[300px] rounded-md" src={image} />
        </div>
        <div className="flex p-3">
          <div className="w-[300px] ">
            <div>
              <p className="text-lg font-bold mb-0">{name}</p>
            </div>
            <div>
              <p className="text-sm">{location}</p>
            </div>
            <div className="mt-5 flex items-center gap-1 ">
              {Array.from({ length: rating }).map((_, i) => (
                <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
          <div className="flex flex-col  justify-end">
            <div></div>
            <div className="flex flex-col  ">
              <p className="font-bold ">
                {currency} {pricePerNight}
              </p>
              <p className="text-sm text-green-600 ">Free cancellation</p>
              <button className="bg-orange-600 hover:bg-orange-800 transition py-1 px-4 text-white rounded-sm font-semibold text-sm">
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default HotelItems;
