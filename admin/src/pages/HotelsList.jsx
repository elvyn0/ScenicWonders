import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import { Trash } from "lucide-react";

function HotelsList() {
  const [list, setList] = useState([]);

  // Fetching Hotels
  const fetchList = async () => {
    try {
      const response = await api.get("/api/hotels/list");
      if (response.data.success) {
        setList(response.data.hotels);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // handling delete hotels
  const removeHotels = async (hotelId) => {
    try {
      const response = await api.delete(`/api/hotels/delete/${hotelId}`);
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const loadHotels = async () => {
      await fetchList();
    };
    loadHotels();
  }, []);

  return (
    <div className="mx-4 md:mx-8 text-center">
      <p className="mb-4 text-lg font-semibold">Hotels List</p>

      {/* -------- Table Header (hidden on mobile) ------- */}
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] text-lg mb-3">
        <b>Hotel</b>
        <b>Name</b>
        <b>Location</b>
        <b>Total Rooms</b>
        <b>Price</b>
        <b>Action</b>
      </div>

      {/* -------- List ------- */}
      <div className="flex flex-col gap-4">
        {list.map((item) => (
          <div
            key={item._id}
            className="
          border rounded-lg p-3 shadow-sm
          md:border-0 md:p-0 md:shadow-none
          md:grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] md:items-center
        "
          >
            {/* Image */}
            <img className="w-full h-40 object-cover rounded md:h-auto md:rounded-none" src={item.hotelImage?.url} />

            {/* Content */}
            <div className="mt-2 md:mt-0">
              <p className="font-semibold text-gray-700 text-lg">{item.name}</p>
              <p className="text-gray-500 md:hidden">{item.location}</p>
            </div>

            {/* Desktop only fields */}
            <p className="hidden md:block text-gray-600">{item.location}</p>
            <p className="hidden md:block text-gray-600">{item.totalRooms}</p>
            <p className="hidden md:block text-gray-600">{item.pricePerNight}</p>

            {/* Mobile extra info */}
            <div className="md:hidden text-sm text-gray-600 mt-1">
              <p>Rooms: {item.totalRooms}</p>
              <p>Price: ₹{item.pricePerNight}</p>
            </div>

            {/* Action */}
            <div
              onClick={() => removeHotels(item._id)}
              className="flex justify-end md:justify-center mt-2 md:mt-0 cursor-pointer"
            >
              <Trash className="text-red-700" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HotelsList;
