import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { MdOutlineExplore } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";
import { LuMessageCircleMore } from "react-icons/lu";
import { RiCameraAiLine } from "react-icons/ri";
import { FaRegPenToSquare } from "react-icons/fa6";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { useEffect } from "react";

function SideBar() {
  const { api, token } = useContext(AppContext);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  // for  story or post
  const handleSelect = (type) => {
    setShowPopup(false);

    if (type === "post") navigate("/post");
    if (type === "stories") navigate("/storiesPost");
  };

  // Unread message count
  const messageCount = async () => {
    try {
      const response = await api.get("/api/messages/count", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setCount(response.data.unreadmsgIdCount);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (token) {
      messageCount();
    }
  }, [token]);

  return (
    <div>
      <div className="fixed bottom-0 md:top-0 left-0 w-full md:w-16 h-16 md:h-full border-t md:border-t-0 md:border-r-2 flex md:flex-col justify-around md:justify-center items-center bg-white z-50">
        <div className="flex   md:flex-col gap-14 items-center">
          {/* Home */}
          <NavLink to="/" className=" p-1 rounded bg-gray-200 text-black hover:bg-gray-300">
            <GoHome className=" isActive size-6" />
          </NavLink>

          {/* Explore */}
          <NavLink to="/explore" className="p-1 rounded  text-black bg-gray-200 hover:bg-gray-300">
            <MdOutlineExplore className="isActive size-6" />
          </NavLink>

          {/* Post && story */}
          <button>
            <IoAddOutline
              className="isActive size-8 p-1 rounded bg-gray-200 text-black hover:bg-gray-300 border border-solid"
              onClick={() => setShowPopup(true)}
            />
          </button>

          {/* Messages */}
          <NavLink to="/message" className="relative p-1 rounded bg-gray-200 text-black hover:bg-gray-300">
            {Number(count) > 0 ? (
              <span
                className={`absolute left-5 -top-1   flex h-4 w-4 items-center justify-center rounded-full ${count !== 0 ? "bg-red-700 text-[10px] font-medium text-white " : ""} `}
              >
                {count}
              </span>
            ) : (
              ""
            )}
            <LuMessageCircleMore className=" isActive size-6" />
          </NavLink>
        </div>
      </div>
      {/* Popup for Post and Writeup's */}
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
