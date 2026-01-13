import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

function Nav() {
  return (
    <div className="w-full px-20 mt-6">
      <div className="flex flex-row gap-10 items-center justify-center ">
        <NavLink
          to="/addHotel"
          className="rounded-2xl shadow-2xl p-5 w-80 bg-white h-100 hover:scale-110 ease-in-out transition duration-300  font-bold text-2xl"
        >
          Add hotels
          <img className="w-full mt-5" src={assets.addHotel} />
        </NavLink>
        <NavLink
          to="/hotelsList"
          className="rounded-2xl shadow-2xl w-80 bg-white h-100 hover:scale-110 ease-out transition duration-300 font-bold p-5 text-2xl"
        >
          Hotels List
          <img className="w-full mt-5" src={assets.hotelList} />
        </NavLink>
        <NavLink
          to="bookingsList"
          className="rounded-2xl shadow-2xl w-80 bg-white h-100 hover:scale-110 ease-in-out transition duration-300 font-bold p-5 text-2xl"
        >
          Bookings List
          <img className="w-full mt-5" src={assets.hotelBooking} />
        </NavLink>
      </div>
    </div>
  );
}

export default Nav;
