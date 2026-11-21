import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import assets from "../../assets/assets";
import { getOptimizedImageUrl } from "../../utils/imageOptimizer";

function PostCategories() {
  const { api, postList, setPostList } = useContext(AppContext);
  const [loading, setLoading] = useState(postList.length === 0);
  const [error, setError] = useState(null);

  // Fetching Posts (Stale-While-Revalidate)
  const fetchList = async (isBackground = false) => {
    try {
      if (!isBackground) setLoading(true);
      setError(null);

      const response = await api.get("/api/post/list");

      if (response.data.success) {
        setPostList(response.data.posts);
        setError(null);
      } else {
        if (!isBackground) toast.error(response.data.message);
        if (postList.length === 0) setError("Failed to load data");
      }
    } catch (err) {
      console.error(err);
      if (!isBackground && postList.length === 0) {
        toast.error(err.response?.data?.message || "Something went wrong");
        setError("Server not responding...");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // If posts are already in memory, fetch in background without blocking UI
    fetchList(postList.length > 0);
  }, []);

  // Handling error state when no data exists //
  if (error && postList.length === 0)
    return (
      <div className="text-center text-lg text-red-600 font-bold py-10">
        <p>{error}</p>
      </div>
    );

  return (
    <div>
      <div>
        <h1 className="font-extrabold text-lg md:text-5xl text-red-600 mb-5">Posts :</h1>
      </div>

      {/* Skeleton loader on initial cold load only */}
      {loading && postList.length === 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden bg-white shadow-sm animate-pulse">
              <div className="flex gap-2 items-center p-2">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div className="h-4 w-20 bg-gray-200 rounded" />
              </div>
              <div className="aspect-[3/4] bg-gray-200" />
              <div className="p-3 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* User Posts */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {postList.map((item) => (
            <div
              key={item._id}
              className="group rounded-xl overflow-hidden bg-white shadow-sm transition-all duration-300"
            >
              <Link to={`/profile/${item.user?._id}`} className="no-underline text-black cursor-pointer">
                <div className="flex gap-2 font-semibold mb-2 items-center p-1">
                  <img
                    src={getOptimizedImageUrl(item.user?.profilePic?.url, { width: 80, height: 80, crop: "fill" }) || assets.profile_icon}
                    alt={item.user?.name || "User"}
                    loading="lazy"
                    decoding="async"
                    className="w-10 h-10 rounded-full object-cover bg-gray-200"
                  />
                  <p>{item.user?.name || "Unknown"}</p>
                </div>
              </Link>
              {/* Image */}
              <NavLink to={`/post/${item._id}`} state={{ post: item }} className={"no-underline"}>
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-lg">
                  <img
                    src={getOptimizedImageUrl(item.image?.url, { width: 500 })}
                    alt={item.caption || "Post image"}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all" />
                </div>

                {/* Caption */}
                <div className="p-3">
                  <p className="text-sm text-gray-800 line-clamp-2">{item.caption}</p>
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostCategories;
