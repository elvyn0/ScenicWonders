import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";

function BookingsList() {
  const [active, setActive] = useState("Confirmed");
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await api.get("/api/bookings/allBooking");

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

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    const loadBookings = async () => {
      await fetchList();
    };
    loadBookings();
  }, []);

  const filteredList = list.filter((item) => item.bookingStatus === active);
  const tabs = [
    { label: "Confirmed", color: "bg-blue-600" },
    { label: "Cancelled", color: "bg-red-600" },
  ];
  return (
    <div className="py-6 flex flex-col gap-10 items-center bg-gray-100">
      {/* Tabs */}
      <div className="flex gap-3 sm:gap-5 text-base sm:text-xl font-semibold">
        {tabs.map((tab) => (
          <div
            key={tab.label}
            onClick={() => setActive(tab.label)}
            className={`px-4 py-2 sm:px-6 sm:py-3 rounded-xl cursor-pointer transition shadow capitalize
          ${active === tab.label ? `${tab.color} text-white` : "bg-white text-black"}`}
          >
            {tab.label}
          </div>
        ))}
      </div>

      <div>
        {/* Table Header (desktop only) */}
        <div className="hidden md:grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] w-full max-w-6xl  px-2 text-center text-sm font-bold  ">
          <p>Booked</p>
          <p>User</p>
          <p>Hotel</p>
          <p>Location</p>
          <p>Dates</p>
          <p>Rooms</p>
          <p>Price</p>
        </div>

        {/* List */}
        <div className="w-full max-w-6xl mt-5 px-2 sm:px-4">
          {filteredList.length === 0 ? (
            <p className="text-center mt-5">No {active} bookings found</p>
          ) : (
            filteredList.map((item) => (
              <div
                key={item._id}
                className="
            bg-white rounded-lg shadow px-2 mb-4
            md:grid md:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] md:items-center md:p-3  w-full max-w-6xl text-center 
          "
              >
                {/* Mobile layout */}
                <div className="md:hidden text-sm space-y-1 p-3">
                  <p className="font-semibold">{item.user.name}</p>
                  <p className="text-gray-600">{item.hotel?.name || item.name}</p>
                  <p className="text-gray-500">{item.location}</p>

                  <p>
                    {formatDate(item.checkInDate)} → {formatDate(item.checkOutDate)}
                  </p>

                  <p>Rooms: {item.numberOfRooms}</p>
                  <p>₹{item.totalPrice}</p>

                  <p className="text-xs text-gray-400">Booked: {formatDate(item.bookedAt)}</p>
                </div>

                {/* Desktop layout */}
                <p className="hidden md:block text-sm">{formatDate(item.bookedAt)}</p>
                <p className="hidden md:block">{item.user.name}</p>
                <p className="hidden md:block font-medium">{item.hotel?.name || item.name}</p>
                <p className="hidden md:block">{item.location}</p>
                <p className="hidden md:block text-sm">
                  {formatDate(item.checkInDate)} - {formatDate(item.checkOutDate)}
                </p>
                <p className="hidden md:block ml-5">{item.numberOfRooms}</p>
                <p className="hidden md:block">₹{item.totalPrice}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingsList;
