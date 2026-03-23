import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

function Nav() {
  return (
    <div className="w-full px-4 md:px-10 mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
        <NavLink
          to="/addHotel"
          className="rounded-2xl shadow-xl p-4 w-full max-w-sm bg-white 
      hover:scale-105 transition duration-300 font-bold text-xl text-center"
        >
          Add Hotels
          <img className="w-full mt-4" src={assets.addHotel} />
        </NavLink>

        <NavLink
          to="/hotelsList"
          className="rounded-2xl shadow-xl p-4 w-full max-w-sm bg-white 
      hover:scale-105 transition duration-300 font-bold text-xl text-center"
        >
          Hotels List
          <img className="w-full mt-4" src={assets.hotelList} />
        </NavLink>

        <NavLink
          to="/bookingsList"
          className="rounded-2xl shadow-xl p-4 w-full max-w-sm bg-white 
      hover:scale-105 transition duration-300 font-bold text-xl text-center"
        >
          Bookings List
          <img className="w-full mt-4" src={assets.hotelBooking} />
        </NavLink>
      </div>
    </div>
  );
}

export default Nav;
