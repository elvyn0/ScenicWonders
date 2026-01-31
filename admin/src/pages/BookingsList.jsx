import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";

function BookingsList({ token }) {
  const [active, setActive] = useState("confirmed");
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await api.get("/api/bookings/allBooking", { headers: { token } });

      if (response.data.success) {
        setList(response.data.bookings);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const loadBookings = async () => {
      await fetchList();
    };
    loadBookings();
  }, []);

  const filteredList = list.filter((item) => item.bookingStatus === active);
  return (
    <div className="py-5 pt-10 flex flex-col gap-2 items-center justify-center bg-gray-100">
      {/* Bookings */}

      <div className="py-5 pt-5 flex flex-col  items-center bg-gray-100 ">
        {/* Tabs */}
        <div className="flex gap-8 text-2xl font-semibold">
          {["confirmed", "pending", "completed"].map((status) => (
            <div
              key={status}
              onClick={() => setActive(status)}
              className={`p-5 rounded-xl cursor-pointer transition shadow-xl capitalize
              ${
                active === status
                  ? status === "confirmed"
                    ? "bg-blue-600 text-white"
                    : status === "pending"
                      ? "bg-red-600 text-white"
                      : "bg-green-700 text-white"
                  : "bg-white text-black"
              }`}
            >
              {status}
            </div>
          ))}
        </div>
      </div>
      {/* List */}
      <div className="w-full flex flex-col max-w-5xl bg-gray-200 rounded-md shadow overflow-hidden mt-5">
        {filteredList.length === 0 ? (
          <p>No {active} bookings found</p>
        ) : (
          filteredList.map((item) => (
            <div
              key={item._id}
              className=" w-full flex justify-between p-5 mb-4 bg-white rounded-md shadow overflow-hidden"
            >
              <img className="w-14 h-14 object-cover rounded" src={item.hotelImage?.[0]} alt="hotel" />
              <p className="font-medium">{item.hotel?.name || item.name}</p>
              <p>{item.pricePerNight}</p>
              <p>{item.location}</p>
              <p className="capitalize font-semibold">{item.bookingStatus}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BookingsList;
