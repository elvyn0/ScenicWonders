import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/appContext";
import WeekendDealsItem from "./WeekendDealsItem";
import { Link } from "react-router-dom";

function WeekendDeals() {
  const { hotels } = useContext(AppContext);
  const [WeekendDeals, setWeekendDeals] = useState([]);

  useEffect(() => {
    const hotDeals = hotels.filter((item) => item.weekendDeals);
    setWeekendDeals(hotDeals.slice(0, 4));
  }, hotels);

  return (
    <div className="bg-gray-50 py-16 px-8  mt-8  flex flex-col   ">
      <div className="flex items-center  justify-between mb-6 px-5">
        <h2 className="text-3xl font-semibold">Weekend deals</h2>
        <Link
          to="/HotelBookings"
          className="text-lg no-underline font-medium text-gray-600 hover:text-black flex items-center gap-1"
        >
          Explore more →
        </Link>
      </div>

      <div className="flex gap-6  items-center justify-center  ">
        {WeekendDeals.map((item) => (
          <WeekendDealsItem
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            pricePerNight={item.pricePerNight}
            destination={item.destination}
          />
        ))}
      </div>
    </div>
  );
}

export default WeekendDeals;
