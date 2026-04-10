import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";

function PostById() {
  const { id } = useParams();
  const { api, token, user, navigate } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);

  const postById = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get(`/api/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setPost(response.data.post);
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
        `/api/post/like/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.success) {
        setPost((prev) => ({ ...prev, likes: response.data.likes, liked: response.data.liked }));
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Like failed");
    }
  };

  // Handling  delete post //

  const handleDelte = async () => {
    try {
      const response = await api.delete(`/api/post/remove/${id}`, {
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
    postById();
  }, [id]);

  console.log(post);

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
      {/* User Posts */}
      {post && (
        <div
          key={post._id}
          className="w-full   max-w-md md:max-w-4xl  
      flex flex-col md:flex-row rounded-xl overflow-hidden bg-gray-50 shadow-md p-2"
        >
          <div>
            {/* mobile */}
            <Link to={`/profile/${post.user._id}`} className="md:hidden  no-underline text-black cursor-pointer ">
              <div className="flex items-center  gap-3 font-semibold p-3">
                <img src={post.user?.profilePic?.url} className="w-10 h-10 rounded-full" />
                <p>{post.user?.name || "Unknown"}</p>
              </div>
            </Link>
            {/* Image */}
            <div className="w-full md:max-w-[600px] md:h-auto">
              <img src={post.image?.url} alt={post.caption} className="h-full w-full object-cover rounded-md" />
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
                <img src={post.user?.profilePic?.url} className="w-10 h-10 rounded-full object-cover" />
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
            {user ? <Trash2 className="w-6 text-red-500 cursor-pointer" /> : ""}
          </div>
        </div>
      )}
    </div>
  );
}

export default PostById;
