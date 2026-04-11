import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

function WeekendDealsItem({ id, name, image, pricePerNight, destination }) {
  const { currency } = useContext(AppContext);

  return (
    <Link to={`/hotels/hotel/${id}`} className="no-underline">
      <div className="bg-white rounded-2xl shadow-md min-w-[260px] hover:shadow-lg transition-all duration-300 p-3 hover:scale-110 ease-in-out ">
        <div className="overflow-hidden rounded-t-2xl">
          <img src={image} className="h-40 w-full object-cover hover:scale-105 transition-transform duration-300" />
        </div>

        <div className="p-4 space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>

          <p className="text-sm text-gray-500">{destination}</p>

          <p className="text-base font-semibold text-gray-900">
            from {currency}
            {pricePerNight}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default WeekendDealsItem;
