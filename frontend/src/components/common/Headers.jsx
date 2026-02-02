import { Heart, LogOut } from "lucide-react";
import { assets } from "../../assets/assets";
import { User } from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../../context/appContext";

// --- Header Component ---
// This component displays the top navigation bar
const Header = ({ onLoginClick, onLogout }) => {
  const { token } = useContext(AppContext);

  return (
    <div className="flex flex-1 items-center justify-between border-b border-gray-200 px-4 py-4 md:px-6">
      {/* Logo */}
      <div className="flex items-center  justify-center gap-2">
        <img src={assets.sw_logo} className="size-10 text-blue-600" />
        <h4 className="font-bold text-lg">Scenic Wonders</h4>
      </div>

      {/* Icons & Login Button */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Favorite Icon */}
        <button aria-label="Favorites" className="text-gray-600 hover:text-gray-900 transition-colors">
          <Heart className="size-6" />
        </button>

        {/* Sign In Button */}

        {!token ? (
          <button
            onClick={onLoginClick}
            className=" flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-100 hover:shadow-sm"
          >
            <User className="size-5" />
            <span>Sign In</span>
          </button>
        ) : (
          <button
            onClick={onLogout}
            className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
          >
            <LogOut className="size-5" />
            <span>Logout</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
