import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/appContext";
import HotelItems from "./HotelItems";
import toast from "react-hot-toast";

function Hotels() {
  const { hotels, api } = useContext(AppContext);
  const [hotelsList, setHotelsList] = useState([]);

  const fetchHotelLists = async () => {
    try {
      const response = await api.get("/api/hotels/list");
      if (response.data.success) {
        setHotelsList(response.data.hotels);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchHotelLists();
  }, [hotels]);

  return (
    <div className="grid grid-flow-col gap-2 ">
      <div>
        {hotelsList.map((item) => (
          <HotelItems
            key={item._id}
            id={item._id}
            image={item.hotelImage?.url}
            name={item.name}
            pricePerNight={item.pricePerNight}
            destination={item.destination}
          />
        ))}
      </div>
    </div>
  );
}

export default Hotels;
