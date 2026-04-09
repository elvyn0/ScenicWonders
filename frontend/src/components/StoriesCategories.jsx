import { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AppContext } from "../context/appContext";
import toast from "react-hot-toast";
import { Heart } from "lucide-react";

function StoriesCategories() {
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
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-extrabold text-3xl tracking-tight text-gray-900">Stories</h1>
        <p className="text-gray-500 mt-2">Real thoughts. Real people.</p>
      </div>

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
                  <img src={item.user?.profilePic || item.user.name} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{item.user?.name || "Unknown"}</p>
                  <p className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </Link>

            <NavLink to={`/story/${item._id}`} className={"no-underline"}>
              {/* Title */}
              <h2 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1 ">{item.title}</h2>

              {/* Content */}
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 ">{item.content}</p>
            </NavLink>
            {/* Footer */}
            <div className="flex justify-between items-centers pt-2 pl-2 border-t ">
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

      {/* See More */}
      <div className="text-center mt-16">
        <Link
          to="/stories"
          className="inline-block font-semibold bg-gray-300 text-black rounded-xl px-8 py-3 hover:bg-gray-400 transition no-underline "
        >
          See more
        </Link>
      </div>
    </div>
  );
}

export default StoriesCategories;
