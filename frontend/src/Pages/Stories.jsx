import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { Heart } from "lucide-react";
import assets from "../assets/assets";
import { getOptimizedImageUrl } from "../utils/imageOptimizer";

function Stories() {
  const { api, storiesList, setStoriesList } = useContext(AppContext);
  const [loading, setLoading] = useState(storiesList.length === 0);
  const [error, setError] = useState(null);

  // Fetching Stories (Stale-While-Revalidate)
  const fetchList = async (isBackground = false) => {
    try {
      if (!isBackground) setLoading(true);
      setError(null);

      const response = await api.get("/api/story/list");
      if (response.data.success) {
        setStoriesList(response.data.stories);
        setError(null);
      } else {
        if (!isBackground) toast.error(response.data.message);
        if (storiesList.length === 0) setError("Failed to load data");
      }
    } catch (err) {
      console.error(err);
      if (!isBackground && storiesList.length === 0) {
        toast.error(err.response?.data?.message || "Something went wrong");
        setError("Server not responding...");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handling Like
  const handleLike = async (id) => {
    try {
      const response = await api.post(`/api/story/like/${id}`, {});
      if (response.data.success) {
        setStoriesList((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, likes: response.data.likes, liked: response.data.liked } : item,
          ),
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Like failed");
    }
  };

  useEffect(() => {
    fetchList(storiesList.length > 0);
  }, []);

  // Handling error state when no data exists //
  if (error && storiesList.length === 0)
    return (
      <div className="text-center text-lg text-red-600 font-bold py-16">
        <p>{error}</p>
      </div>
    );

  return (
    <div className="p-3">
      {/* Skeletons on initial cold load only */}
      {loading && storiesList.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div className="space-y-1">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                  <div className="h-3 w-16 bg-gray-200 rounded" />
                </div>
              </div>
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-5/6" />
                <div className="h-3 bg-gray-200 rounded w-4/6" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Stories Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {storiesList.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md hover:shadow-md transition"
            >
              {/* User */}
              <NavLink to={`/profile/${item.user?._id}`} className="no-underline text-black cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={
                      getOptimizedImageUrl(item.user?.profilePic?.url, { width: 80, height: 80, crop: "fill" }) ||
                      assets.profile_icon
                    }
                    alt={item.user?.name || "User"}
                    loading="lazy"
                    decoding="async"
                    className="w-10 h-10 rounded-full object-cover bg-gray-200"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{item.user?.name || "Unknown"}</p>
                    <p className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </NavLink>

              <NavLink to={`/story/${item._id}`} state={{ story: item }} className={"no-underline"}>
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
                <span className="flex text-sm text-gray-500 gap-1 mt-1">
                  <Heart
                    className={`font-bold ${item?.liked ? "text-white bg-red-500 rounded-full p-1" : "text-black"}`}
                  />
                  {item?.likes?.length || 0}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Stories;
