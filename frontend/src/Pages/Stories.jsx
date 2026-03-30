import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/appContext";
import toast from "react-hot-toast";
import { Link } from "lucide-react";
import { NavLink } from "react-router-dom";

function Stories() {
  const { api, token } = useContext(AppContext);
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await api.get("/api/story/list");
      if (response.data.success) {
        setList(response.data.stories);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // Handleing Like //

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
  }, [token]);

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
            <Link to={`/profile/${item.user._id}`} className="no-underline text-black cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-700">
                  {item.user?.name}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{item.user?.name || "Unknown"}</p>
                  <p className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </Link>
            <NavLink to={`/story/${item._id}`} className={"no-underline"}>
              {/* Title */}
              <h2 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{item.title}</h2>

              {/* Content */}
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">{item.content}</p>
            </NavLink>

            {/* Footer */}
            <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-100 ">
              <span onClick={() => handleLike(item._id)} className="text-sm text-gray-400 cursor-pointer ">
                ❤️ {item.likes.length || 0}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stories;
