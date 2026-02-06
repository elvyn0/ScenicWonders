import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/appContext";
import toast from "react-hot-toast";
import { useEffect } from "react";

function PostCategories() {
  const { api } = useContext(AppContext);
  const [postList, setPostList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await api.get("/api/post/list");
      if (response.data.success) {
        setPostList(response.data.posts);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
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
            {/* Image */}
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostCategories;
