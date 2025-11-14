import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { MdOutlineExplore } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuMessageCircleMore } from "react-icons/lu";
import { RiCameraAiLine } from "react-icons/ri";
import { FaRegPenToSquare } from "react-icons/fa6";

function SideBar() {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (type) => {
    setShowPopup(false);
    if (type === "post") navigate("/post");
    if (type === "stories") navigate("/storiesPost");
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-[4%] h-full border-r-2 flex flex-col  justify-center items-center">
        <div className="flex flex-col gap-14 items-center">
          {/* Home */}
          <NavLink to="/">
            <GoHome className="size-8 p-1 rounded bg-gray-200 text-black hover:bg-gray-400" />
          </NavLink>

          {/* Explore */}
          <NavLink to="/explore">
            <MdOutlineExplore className="size-8 p-1 rounded  text-black bg-gray-200 hover:bg-gray-400" />
          </NavLink>

          {/* Post */}
          <button>
            <IoAddOutline
              className="size-8 p-1 rounded bg-gray-200 text-black hover:bg-gray-400 border border-solid"
              onClick={() => setShowPopup(true)}
            />
          </button>

          {/* Notifications */}
          <NavLink>
            <IoMdNotificationsOutline className="size-8 p-1 rounded bg-gray-200 text-black hover:bg-gray-400 " />
          </NavLink>

          {/* Messages */}
          <NavLink to={"/message"}>
            <LuMessageCircleMore className="size-8 p-1 rounded bg-gray-200 text-black hover:bg-gray-400" />
          </NavLink>
        </div>
      </div>
      {/* Popup */}
      {showPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 transition-all"
          onClick={() => setShowPopup(false)}
        >
          <div className="bg-white rounded-lg shadow-lg w-[460px] p-6 relative" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button
              className="absolute top-2 right-2 text-xl font-bold hover:bg-gray-800 hover:text-white rounded-full px-1"
              onClick={() => setShowPopup(false)}
            >
              ✕
            </button>

            <h1 className="text-xl font-semibold mb-4">Create</h1>
            <div className="space-y-4">
              {/* Post Option */}
              <div
                onClick={() => handleSelect("post")}
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-100  p-2 rounded"
              >
                <RiCameraAiLine className="size-14 bg-gray-300 p-2 rounded" />
                <p className="font-bold text-lg">Post</p>
                <p className="text-sm text-gray-500 ">Turn your travels into timeless snaps</p>
              </div>

              {/* Stories Option */}
              <div
                onClick={() => handleSelect("stories")}
                className="flex items-center gap-3 cursor-pointer  hover:bg-gray-100  p-2 rounded"
              >
                <FaRegPenToSquare className="size-16  bg-gray-300  px-3 py-2 rounded" />
                <p className="font-bold text-lg">Stories</p>
                <p className="text-sm text-gray-500">Write it down — the world wants to feel your journey</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SideBar;
