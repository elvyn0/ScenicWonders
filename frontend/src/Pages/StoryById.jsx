import { useContext, useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { Heart, Trash2 } from "lucide-react";
import assets from "../assets/assets";
import { getOptimizedImageUrl } from "../utils/imageOptimizer";

function StoryById() {
  const { id } = useParams();
  const location = useLocation();
  const { api, user, navigate, storyCache, setStoryCache } = useContext(AppContext);

  // Instantly use passed route state or memory cache
  const initialStory = location.state?.story || storyCache?.[id] || null;
  const [loading, setLoading] = useState(!initialStory);
  const [error, setError] = useState(null);
  const [story, setStory] = useState(initialStory);

  // Detail story (silent background update if story already in memory)
  const fetchStoryById = async () => {
    try {
      if (!initialStory) setLoading(true);
      setError(null);

      const response = await api.get(`/api/story/${id}`);
      if (response.data.success) {
        setStory(response.data.story);
        setStoryCache((prev) => ({ ...prev, [id]: response.data.story }));
        setError(null);
      } else {
        if (!initialStory) {
          toast.error(response.data.message);
          setError("Failed to load data");
        }
      }
    } catch (err) {
      console.error(err);
      if (!initialStory) {
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
      const response = await api.post(`/api/story/like/${id}`, {});
      if (response.data.success) {
        const updated = { ...story, likes: response.data.likes, liked: response.data.liked };
        setStory(updated);
        setStoryCache((prev) => ({ ...prev, [id]: updated }));
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Like failed");
    }
  };

  // Handling delete story
  const handleDelete = async () => {
    try {
      const response = await api.delete(`/api/story/remove/${id}`);
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
    fetchStoryById();
  }, [id]);

  // Handling Loading state when no cache exists
  if (loading && !story)
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 p-6 shadow-md animate-pulse">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gray-200" />
            <div className="space-y-1">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-3 w-16 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-4/6" />
          </div>
        </div>
      </div>
    );

  // Handling error state when no cache exists
  if (error && !story)
    return (
      <div className="text-center text-lg text-red-600 font-bold py-16">
        <p>{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div>
        {story && (
          <div key={story._id} className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 p-6 shadow-md">
            {/* User */}
            <div className="flex justify-between items-center mb-4">
              <Link to={`/profile/${story.user?._id}`} className="no-underline cursor-pointer">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      getOptimizedImageUrl(story.user?.profilePic?.url, { width: 80, height: 80, crop: "fill" }) ||
                      assets.profile_icon
                    }
                    alt={story.user?.name || "User"}
                    className="w-10 h-10 rounded-full object-cover bg-gray-200"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{story.user?.name || "Unknown"}</p>
                    <p className="text-xs text-gray-400">{new Date(story.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </Link>
              {story.user?._id === user?._id && (
                <div onClick={handleDelete}>
                  {user && <Trash2 className="text-red-500 w-6 h-6 hover:cursor-pointer" />}
                </div>
              )}
            </div>

            <div className="min-w-[320px] md:min-w-[550px]">
              {/* Title */}
              <h2 className="font-bold text-xl text-gray-900 mb-3">{story.title}</h2>

              {/* Content */}
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{story.content}</p>
            </div>

            {/* Footer */}
            <div
              onClick={handleLike}
              className="flex justify-between items-center pt-4 mt-4 border-t hover:cursor-pointer"
            >
              <span className="flex text-sm text-gray-500 gap-1 items-center">
                <Heart
                  className={`cursor-pointer ${story?.liked ? "text-white fill-red-500 bg-red-500 rounded-full p-1" : "text-black"}`}
                />
                {story.likes?.length || 0}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StoryById;
