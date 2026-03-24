import React from "react";
import { assets } from "../assets/assets";

function Headers({ setToken }) {
  const Logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };
  return (
    <div className="pt-3 px-3 md:px-6 pb-2 bg-white mb-5">
      <div className="flex items-center justify-between gap-2">
        {/* Logo */}
        <div className="flex flex-col items-center text-[10px] md:text-sm font-bold">
          <img className="w-8 h-8 md:w-12 md:h-12" src={assets.sw_logo} />
          <p className="hidden sm:block">Scenic Wonders</p>
        </div>

        {/* Title */}
        <div className="rounded-lg px-3 py-1 md:px-6 md:py-3 bg-black shadow-md">
          <p className="text-sm sm:text-lg md:text-2xl font-bold text-white whitespace-nowrap">Admin Panel</p>
        </div>

        {/* Logout */}
        <button
          onClick={Logout}
          className="px-2 py-1 md:px-4 md:py-2 rounded-lg border text-xs sm:text-sm md:text-lg text-blue-900 font-semibold hover:bg-blue-100 transition-all whitespace-nowrap"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Headers;
