import React from "react";
import { assets } from "../assets/assets";

function Headers({ setToken }) {
  const Logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };
  return (
    <div className="pt-5 px-3 pb-2  bg-white mb-5 ">
      <div className="flex flex-row items-center justify-between ">
        <div className="flex flex-col gap-1 justify-start text-sm font-bold items-center">
          <img className="size-14" src={assets.sw_logo} />
          <p>Scenic Wonders</p>
        </div>

        <div className=" rounded-xl py-4 px-10 bg-black shadow-lg">
          <p className="text-3xl font-bold  text-white">Admin panel</p>
        </div>

        <div>
          <button
            onClick={Logout}
            className="flex-1 flex justify-end px-3 py-1 rounded-lg border text-lg text-blue-900 font-semibold hover:bg-blue-100   transition-all "
          >
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
}

export default Headers;
