import React, { useContext, useState } from "react";
import { AppContext } from "../context/appContext";
import toast from "react-hot-toast";

function StoriesPost() {
  const { api, token } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [uploading, setUploading] = useState(false);

  const handileSubmit = async (e) => {
    e.preventDefault();

    try {
      setUploading(true);

      const response = await api.post(
        "/api/story/add",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setTitle("");
        setContent("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setUploading(false);
    }
  };
  return (
    <form onSubmit={handileSubmit} className="pt-5 px-4 md:px-[5%]">
      <h3 className="font-bold text-lg md:text-xl">Stories</h3>

      <div className="flex justify-center items-center mt-5">
        <div className="flex flex-col gap-5 bg-gray-300 w-full max-w-[600px] p-4 md:p-5 rounded-lg shadow-xl">
          {/* Headline */}
          <div>
            <p className="text-sm mb-1">Headline</p>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="py-2 md:py-3 pl-2 rounded-md w-full"
              placeholder="Headline"
              value={title}
              required
            />
          </div>

          {/* Content */}
          <div className="flex flex-col">
            <p className="text-sm mb-1">Write Ups</p>
            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              className="w-full p-2 rounded-lg min-h-[120px] md:min-h-[150px] resize-none"
              placeholder="Share your stories here..."
              required
            />
          </div>

          {/* Button */}
          <div className="flex justify-end">
            <button
              className="bg-white font-bold py-2 md:py-3 px-4 md:px-5 rounded-full  hover:bg-gray-300  transition duration-300 shadow-md w-full md:w-auto"
              type="submit"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Create"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default StoriesPost;
