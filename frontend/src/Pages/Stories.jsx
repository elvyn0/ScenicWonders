import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/appContext";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { Heart } from "lucide-react";
import { assets } from "../assets/assets";

function Stories() {
  const { api, token } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/api/story/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setList(response.data.stories);
        setError(null);
      } else {
        toast.error(response.data.message);
        setError("Failed to load data");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
      setError("Server not responding...");
    } finally {
      setLoading(false);
    }
  };

  // Handling Like //

  const handleLike = async (id) => {
    try {
      const response = await api.post(
        `/api/story/like/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.success) {
        setList((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, likes: response.data.likes, liked: response.data.liked } : item,
          ),
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Like failed");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // Handling Loading state //
  if (loading)
    return (
      <div className="text-center">
        <p className="text-blue-600 font-bold text-lg">Loading Data...</p>
      </div>
    );
  // Handling error state //
  if (error)
    return (
      <div className="text-center text-lg text-red-600 font-bold">
        <p>{error}</p>
      </div>
    );

  return (
    <div className="p-5 ml-[4%]">
      {/* Introduction/Heading */}

      {/* Stories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition"
          >
            {/* User */}
            <NavLink to={`/profile/${item.user?._id}`} className="no-underline text-black cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-700">
                  <img src={item.user?.profilePic?.url || assets.profile_icon} className="rounded-full" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{item.user?.name || "Unknown"}</p>
                  <p className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </NavLink>

            <NavLink to={`/story/${item._id}`} className={"no-underline"}>
              {/* Title */}
              <h2 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{item.title}</h2>

              {/* Content */}
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">{item.content}</p>
            </NavLink>

            {/* Footer */}
            <div
              onClick={() => handleLike(item._id)}
              className="flex justify-between items-centers pt-2 pl-2 border-t hover:cursor-pointer"
            >
              <span className="flex text-sm text-gray-500 gap-1 mt-1 ">
                <Heart
                  className={`text-black font-bold ${item?.liked ? "text-white bg-red-500  rounded-full p-1  " : ""}`}
                />
                {item.likes.length || 0}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stories;
