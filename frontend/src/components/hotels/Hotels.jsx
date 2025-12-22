import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/appContext";
import HotelItems from "./HotelItems";

function Hotels() {
  const { hotels, showSearch, search } = useContext(AppContext);
  const [filteredHotels, setFilteredHotels] = useState([]);

  const applyFilter = () => {
    let tempHotels = hotels.slice();

    if (showSearch && search) {
      const text = search.toLowerCase();

      tempHotels = tempHotels.filter(
        (item) => item.name.toLowerCase().includes(text) || item.destination.toLowerCase().includes(text)
      );
    }

    setFilteredHotels(tempHotels);
  };

  useEffect(() => {
    applyFilter();
  }, [hotels, search, showSearch]);

  return (
    <div className="grid grid-flow-col gap-2 ">
      <div>
        {filteredHotels.map((item) => (
          <HotelItems
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

export default Hotels;
