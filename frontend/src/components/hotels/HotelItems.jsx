import { useContext } from "react";
import { AppContext } from "../../context/appContext";
import { Link } from "react-router-dom";

function HotelItems({ id, name, image, pricePerNight, destination }) {
  const { currency } = useContext(AppContext);

  return (
    <Link className=" w-full no-underline " to={`/hotels/hotel/${id}`}>
      <div className="flex flex-1 text-gray-700 shadow-md bg-white p-3 mb-5 rounded-lg">
        <div>
          <img className="max-w-[300px] max-h-[300px] rounded-md" src={image} />
        </div>
        <div className="flex p-3">
          <div className="w-[300px] ">
            <div>
              <p className="text-lg font-bold mb-0">{name}</p>
            </div>
            <div>
              <p className="text-sm">{destination}</p>
            </div>
          </div>
          <div className="flex flex-col  justify-end   ">
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
