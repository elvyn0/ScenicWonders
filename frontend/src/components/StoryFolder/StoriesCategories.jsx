import { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import assets from "../../assets/assets";
import { getOptimizedImageUrl } from "../../utils/imageOptimizer";

function StoriesCategories() {
  const { api, storiesList, setStoriesList } = useContext(AppContext);
  const [loading, setLoading] = useState(storiesList.length === 0);
  const [error, setError] = useState(null);

  // Fetching stories (Stale-While-Revalidate)
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

  useEffect(() => {
    fetchList(storiesList.length > 0);
  }, []);

  // Handling error state when no data exists //
  if (error && storiesList.length === 0)
    return (
      <div className="text-center text-lg text-red-600 font-bold py-8">
        <p>{error}</p>
      </div>
    );

  return (
    <div className="mt-5">
      {/* Header */}
      <div className="mb-5">
        <h1 className="font-extrabold text-lg md:text-5xl tracking-tight text-red-600">Stories :</h1>
        <p className="text-gray-500">Real thoughts. Real people.</p>
      </div>

      {/* Stories Grid */}
      {loading && storiesList.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {storiesList.slice(0, 6).map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition"
            >
              {/* User */}
              <Link to={`/profile/${item.user?._id}`} className="no-underline text-black cursor-pointer">
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
              </Link>

              <NavLink to={`/story/${item._id}`} state={{ story: item }} className={"no-underline"}>
                {/* Title */}
                <h2 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{item.title}</h2>

                {/* Content */}
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">{item.content}</p>
              </NavLink>
            </div>
          ))}
        </div>
      )}

      {/* See More */}
      <div className="text-center mt-16">
        <Link
          to="/stories"
          className="inline-block font-semibold bg-gray-300 text-black rounded-xl px-8 py-3 hover:bg-gray-400 transition-all duration-300 no-underline"
        >
          See more
        </Link>
      </div>
    </div>
  );
}

export default StoriesCategories;
