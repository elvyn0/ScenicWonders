import { Star } from "lucide-react";
import { assets } from "../../assets/assets";
import { User } from "lucide-react";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

// --- Header Component --- //
// This component displays the top navigation bar
const Header = ({ onLoginClick, onLogout }) => {
  const { token, navigate, user } = useContext(AppContext);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="relative   flex  items-center justify-between border-b border-gray-200 px-5 py-4">
      {/* Logo */}
      <div className="flex items-center  justify-center gap-2">
        <img src={assets.sw_logo} className="size-10" />
        <h4 className="font-bold text-lg">Scenic Wonders</h4>
      </div>

      {/* Icons & Login Button */}
      <div className="flex items-center gap-4 ">
        {/* Favorite Icon */}
        <div type="button" onClick={() => navigate("/myBookings")} aria-label="bookings" className="icon-btn">
          <Star className="icon-bookings" />
          <span className="tooltip">Bookings</span>
        </div>

        {/* Sign In Button and profile drop down  */}
        {!token ? (
          <button
            onClick={onLoginClick}
            className="flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs md:text-sm hover:bg-gray-100"
          >
            <User className="size-4 md:size-5" />
            <span className="hidden sm:inline">Sign In</span>
          </button>
        ) : (
          <div className="relative">
            <img
              src={assets.profile_icon}
              className="w-5  hover:cursor-pointer rounded-full"
              onClick={() => setShowDropdown((prev) => !prev)}
            />

            {showDropdown && (
              <div className="absolute right-0 mt-1 w-28 text-center bg-white border rounded-sm shadow-lg">
                <div className="w-full text-sm font-semibold">
                  {user && (
                    <p
                      onClick={() => {
                        navigate(`/profile/${user._id}`);
                        setShowDropdown(false);
                      }}
                      className="text-gray-500 py-2 hover:bg-gray-200 mb-0"
                    >
                      Profile
                    </p>
                  )}
                  <p
                    onClick={() => {
                      onLogout();
                      setShowDropdown(false);
                    }}
                    className="text-gray-500 hover:bg-gray-200  border-t-2 border-t-white  mb-0 py-2"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
