import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";

function HotelsList({ token }) {
  const [list, setList] = useState([]);

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

  const removeHotels = async (hotelId) => {
    try {
      const response = await api.delete(`/api/hotels/delete/${hotelId}`, { headers: { token } });
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
    <div className="mx-8 text-center">
      <p className="mb-2">Hotels List</p>
      <div className="flex flex-col gap-2">
        {/* -------- List Table Title ------- */}

        <div className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr]">
          <b>Hotel</b>
          <b>Name</b>
          <b>Location</b>
          <b>Total Rooms</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {/*---  List ---- */}

        {list.map((item) => (
          <div className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr]" key={item._id}>
            <img className="w-full" src={item.hotelImage?.url} />
            {console.log(list.hotelImage)}

            <p>{item.name}</p>
            <p>{item.location}</p>
            <p>{item.totalRooms}</p>
            <p>{item.pricePerNight}</p>
            <p onClick={() => removeHotels(item._id)} className="text-right md:text-center cursor-pointer text-lg">
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HotelsList;
