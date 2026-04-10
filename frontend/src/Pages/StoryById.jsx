import React from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/appContext";
import { useState } from "react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";
import { assets } from "../assets/assets";

function StoryById() {
  const { id } = useParams();
  const { api, token, user, navigate } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [story, setStory] = useState(null);

  // Detail story //
  const fetchStoryById = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get(`/api/story/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setStory(response.data.story);
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
  const handleLike = async () => {
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
        setStory((prev) => ({ ...prev, likes: response.data.likes, liked: response.data.liked }));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Like failed");
    }
  };

  // Handling  delete story //
  const handleDelete = async () => {
    try {
      const response = await api.delete(`/api/story/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate(-1);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchStoryById();
  }, [id]);

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
    <div className="min-h-screen flex items-center justify-center">
      <div>
        {story && (
          <div key={story._id} className=" w-full bg-white rounded-2xl border border-gray-200 p-6 shadow-md">
            {/* User */}
            <div className="flex justify-between">
              <Link to={`/profile/${story.user._id}`} className="no-underline cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-700">
                    <img src={story.user?.profilePic?.url || assets.profile_icon} className="rounded-full" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{story.user?.name || "Unknown"}</p>
                    <p className="text-xs text-gray-400">{new Date(story.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </Link>
              {story.user?._id === user?._id && (
                <div onClick={handleDelete}>{user && <Trash2 className="text-red-500 w-8 hover:cursor-pointer" />}</div>
              )}
            </div>

            <div className="min-w-[350px] md:min-w-[600px]">
              {/* Title */}
              <h2 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{story.title}</h2>

              {/* Content */}
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">{story.content}</p>
            </div>

            {/* Footer */}
            <div
              onClick={handleLike}
              className="flex justify-between items-centers pt-2 pl-2 border-t hover:cursor-pointer"
            >
              <span className="flex text-sm text-gray-500 gap-1 mt-1 ">
                <Heart
                  className={`text-black font-bold ${story?.liked ? "text-white bg-red-500  rounded-full p-1  " : ""}`}
                />
                {story.likes.length || 0}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StoryById;
