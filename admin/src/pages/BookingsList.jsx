import React, { useState } from "react";

function BookingsList() {
  const [active, setActive] = useState("bookings");
  return (
    <div className="p-5 pt-10 flex flex-col gap-10 items-center justify-center bg-gray-200">
      <div className=" flex  flex-row gap-10 text-3xl font-semibold ">
        <div
          onClick={() => setActive("bookings")}
          className={` p-5 rounded-xl transition duration-300 shadow-xl ${
            active === "bookings" ? "bg-blue-600 text-white" : "bg-white text-black"
          }`}
        >
          <p>Bookings</p>
        </div>
        <div
          onClick={() => setActive("deleted")}
          className={` p-5 rounded-xl  transition duration-300 shadow-xl ${
            active === "deleted" ? "bg-red-600 text-white" : "bg-white"
          }`}
        >
          <p>Deleted</p>
        </div>
      </div>
      {/* Content */}
      <div className="relative w-full  h-40 overflow-hidden">
        {/* Bookings */}
        <div
          className={`absolute w-full transition-all duration-500 ${
            active === "bookings" ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0 pointer-events-none"
          }`}
        >
          <div className="bg-blue-100 text-center ">Active bookings feild</div>
        </div>
        {/* Deleted */}
        <div
          className={`absolute w-full transition-all duration-500 ${
            active === "deleted" ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0 pointer-events-none"
          }`}
        >
          <div className="bg-red-400  text-center text-5xl">active deleted feild</div>
        </div>
      </div>
    </div>
  );
}

export default BookingsList;
