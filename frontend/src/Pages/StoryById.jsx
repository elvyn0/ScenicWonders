import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function StoryById() {
  const { id } = useParams();
  const { api } = useContext(AppContext);

  const [story, setStory] = useState(null);

  const storyById = async () => {
    try {
      const response = await api.get(`/api/story/${id}`);

      if (response.data.success) {
        setStory(response.data.story);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    storyById();
  }, [id]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        {story && (
          <div key={story._id} className=" w-full bg-white rounded-2xl border border-gray-200 p-6 shadow-md">
            {/* User */}
            <Link to={`/profile/${story.user._id}`} className="no-underline cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-700">
                  {story.user?.name}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{story.user?.name || "Unknown"}</p>
                  <p className="text-xs text-gray-400">{new Date(story.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </Link>

            <div className="min-w-[350px] md:min-w-[600px]">
              {/* Title */}
              <h2 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{story.title}</h2>

              {/* Content */}
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">{story.content}</p>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-400">❤️ {story.like || 0}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StoryById;
