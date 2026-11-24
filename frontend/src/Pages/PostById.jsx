import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useParams, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";
import assets from "../assets/assets";
import { getOptimizedImageUrl } from "../utils/imageOptimizer";

function PostById() {
  const { id } = useParams();
  const location = useLocation();
  const { api, user, navigate, postCache, setPostCache } = useContext(AppContext);

  // Instantly use passed route state or memory cache
  const initialPost = location.state?.post || postCache?.[id] || null;
  const [loading, setLoading] = useState(!initialPost);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(initialPost);

  // Fetch post by id (silent background update if post already in memory)
  const postById = async () => {
    try {
      if (!initialPost) setLoading(true);
      setError(null);

      const response = await api.get(`/api/post/${id}`);
      if (response.data.success) {
        setPost(response.data.post);
        setPostCache((prev) => ({ ...prev, [id]: response.data.post }));
        setError(null);
      } else {
        if (!initialPost) {
          toast.error(response.data.message);
          setError("Failed to load data");
        }
      }
    } catch (err) {
      console.error(err);
      if (!initialPost) {
        toast.error(err.response?.data?.message || "Something went wrong");
        setError("Server not responding...");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handling Like
  const handleLike = async () => {
    try {
      const response = await api.post(`/api/post/like/${id}`, {});
      if (response.data.success) {
        const updated = { ...post, likes: response.data.likes, liked: response.data.liked };
        setPost(updated);
        setPostCache((prev) => ({ ...prev, [id]: updated }));
      } else {
        toast.error(response.data.error);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Like failed");
    }
  };

  // Handling delete post
  const handleDelte = async () => {
    try {
      const response = await api.delete(`/api/post/remove/${id}`);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate(-1);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    postById();
  }, [id]);

  // Handling Loading state when no cache exists
  if (loading && !post)
    return (
      <div className="min-h-screen flex items-center justify-center py-4">
        <div className="w-full max-w-md md:max-w-4xl flex flex-col md:flex-row rounded-xl overflow-hidden bg-white shadow-md p-4 animate-pulse gap-4">
          <div className="w-full md:w-1/2 aspect-[4/5] bg-gray-200 rounded-lg" />
          <div className="w-full md:w-1/2 space-y-4 pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200" />
              <div className="h-4 w-24 bg-gray-200 rounded" />
            </div>
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        </div>
      </div>
    );

  // Handling error state
  if (error && !post)
    return (
      <div className="text-center text-lg text-red-600 font-bold py-16">
        <p>{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center py-4">
      {/* User Posts */}
      {post && (
        <div
          key={post._id}
          className="w-full   max-w-md md:max-w-4xl  
      flex flex-col md:flex-row rounded-xl overflow-hidden bg-gray-50 shadow-md p-1"
        >
          <div>
            {/* mobile */}
            <Link to={`/profile/${post.user._id}`} className="md:hidden  no-underline text-black cursor-pointer ">
              <div className="flex items-center  gap-3 font-semibold p-3">
                <img
                  src={getOptimizedImageUrl(post.user?.profilePic?.url, { width: 100, height: 100, crop: "fill" }) || assets.profile_icon}
                  alt={post.user?.name || "User"}
                  className="w-10 h-10 rounded-full object-cover bg-gray-200"
                />
                <p>{post.user?.name || "Unknown"}</p>
              </div>
            </Link>
            {/* Image */}
            <div className="w-full md:max-w-[600px] md:h-auto bg-gray-100 rounded-md">
              <img
                src={getOptimizedImageUrl(post.image?.url, { width: 1200 })}
                alt={post.caption || "Post image"}
                className="h-full w-full object-cover rounded-md"
              />
            </div>
            {/* Like */}
            <div onClick={handleLike} className="flex justify-between items-centers pt-2 pl-2 hover:cursor-pointer">
              <span className="flex text-sm text-gray-500 gap-1 ">
                <Heart
                  className={`text-black font-bold ${post?.liked ? "text-white bg-red-500  rounded-full p-1  " : ""}`}
                />
                {post.likes.length || 0}
              </span>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full md:w-1/2 flex flex-col justify-start">
            {/* Desktop */}
            <Link to={`/profile/${post.user._id}`} className="hidden md:block no-underline text-black cursor-pointer">
              <div className="flex items-center  gap-3 font-semibold p-3">
                <img
                  src={getOptimizedImageUrl(post.user?.profilePic?.url, { width: 100, height: 100, crop: "fill" }) || assets.profile_icon}
                  alt={post.user?.name || "User"}
                  className="w-10 h-10 rounded-full object-cover bg-gray-200"
                />
                <p>{post.user?.name || "Unknown"}</p>
              </div>
            </Link>
            <hr className="text-gray-500 mb-1 md:mt-2" />
            {/* Caption */}
            <div className="flex flex-col">
              <p className="text-sm text-gray-400 pl-1">Caption :</p>
              <p className="text-sm text-gray-600 pl-4">{post.caption}</p>
            </div>
          </div>
          <div className="flex justify-end pr-1" onClick={handleDelte}>
            {post.user?._id === user?._id && <Trash2 className="w-6 text-red-500 cursor-pointer" />}
          </div>
        </div>
      )}
    </div>
  );
}

export default PostById;
