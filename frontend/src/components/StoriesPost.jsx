import React, { useContext, useState } from "react";
import { AppContext } from "../context/appContext";
import toast from "react-hot-toast";

function StoriesPost() {
  const { api, token } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handileSubmit = async (e) => {
    e.preventDefault();

    try {
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
    }
  };
  return (
    <form onSubmit={handileSubmit} className="pt-5 px-[5%] ">
      <h3 className="font-bold"> Stories</h3>
      <div className="flex  justify-center items-center mt-5 ">
        <div className="flex flex-col gap-5 bg-gray-300 w-[50%] p-5 rounded-lg shadow-xl ">
          <div>
            <p className="text-sm">Headline </p>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="py-3   pl-2 rounded-md w-full"
              placeholder="Headline"
              value={title}
              required
            />
          </div>
          <div className=" flex flex-col justify-center">
            <p className="text-sm">Write Ups</p>
            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              type="text"
              className="w-full pb-5 pt-1 pl-2 rounded-lg"
              placeholder="Share your stories here..."
              required
            />
          </div>
          <div className="flex justify-end ">
            <button
              className=" border-2 border-white border-solid font-bold  py-3 px-4 rounded-full hover:bg-gray-500 hover:text-white transition-all shadow-md"
              type="submit"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default StoriesPost;
