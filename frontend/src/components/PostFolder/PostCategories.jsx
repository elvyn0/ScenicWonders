import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

function PostCategories() {
  const { api } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [postList, setPostList] = useState([]);

  // Fetching Posts
  const fetchList = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/api/post/list");

      if (response.data.success) {
        setPostList(response.data.posts);
        setError(null);
      } else {
        toast.error(response.data.message);
        setError("Failed to load data");
      }
    } catch (error) {
      console.error(error);
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
    <div>
      <div>
        <h1 className="font-bold text-3xl flex justify-start mb-9">Posts</h1>
      </div>
      {/*User Posts */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {postList.map((item) => (
          <div
            key={item._id}
            className="group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <Link to={`/profile/${item.user._id}`} className="no-underline text-black cursor-pointer">
              <div className="flex gap-2 font-semibold mb-2 ">
                <img src={item.user?.profilePic?.url || assets.profile_icon} className="w-10 rounded-full" />
                <p>{item.user?.name || "Unknown"}</p>
              </div>
            </Link>
            {/* Image */}
            <NavLink to={`/post/${item._id}`} className={"no-underline"}>
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={item.image?.url}
                  alt={item.caption}
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
    </div>
  );
}

export default PostCategories;
