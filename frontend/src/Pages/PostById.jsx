import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

function PostById() {
  const { id } = useParams();
  const { api } = useContext(AppContext);

  const [post, setPost] = useState(null);

  const postById = async () => {
    try {
      const response = await api.get(`/api/post/${id}`);
      if (response.data.success) {
        setPost(response.data.post);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    postById();
  }, [id]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* User Posts */}
      {post && (
        <div
          key={post._id}
          className="w-full   max-w-md md:max-w-4xl  
      flex flex-col md:flex-row rounded-xl overflow-hidden bg-gray-50 shadow-md p-2"
        >
          {/* mobile */}
          <Link to={`/profile/${post.user._id}`} className="md:hidden  no-underline text-black cursor-pointer mb-2">
            <div className="flex items-center  gap-3 font-semibold p-3">
              <img src={assets.profile1} className="w-10 h-10 rounded-full object-cover" />
              <p>{post.user?.name || "Unknown"}</p>
            </div>
          </Link>
          {/* Image */}
          <div className="w-full md:w-1/2  md:h-auto">
            <img src={post.image?.url} alt={post.caption} className="h-full w-full object-cover rounded-md" />
          </div>

          {/* Right Side */}
          <div className="w-full md:w-1/2 flex flex-col justify-start">
            {/* Desktop */}
            <Link to={`/profile/${post.user._id}`} className="hidden md:block no-underline text-black cursor-pointer">
              <div className="flex items-center  gap-3 font-semibold p-3">
                <img src={assets.profile1} className="w-10 h-10 rounded-full object-cover" />
                <p>{post.user?.name || "Unknown"}</p>
              </div>
            </Link>
            {/* Caption */}
            <div className=" py-4 pl-6 ">
              <p className="text-sm text-gray-600">{post.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostById;
