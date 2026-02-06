import { useContext, useState } from "react";
import { GrUploadOption } from "react-icons/gr";
import { AppContext } from "../context/appContext";
import { toast } from "react-hot-toast";

function Post() {
  const { api, token } = useContext(AppContext);
  const [image, setImage] = useState(false);
  const [caption, setCaption] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("caption", caption);
      image && formData.append("image", image);

      const response = await api.post("/api/post/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setCaption("");
        setImage(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <form onSubmit={handleSubmit} className=" pt-5 px-[5%]">
      <h3 className="font-bold mb-5">Creat Post</h3>
      <div className="flex flex-row gap-5 items-center  justify-center mt-5">
        <label
          htmlFor="image"
          className="cursor-pointer bg-gray-300 w-[400px] h-[500px]  flex flex-col  justify-center items-center rounded-3xl"
        >
          {!image ? (
            <GrUploadOption className="size-10 mb-3" />
          ) : (
            <img className="w-[400px] h-[500px]  rounded-lg" required src={URL.createObjectURL(image)} />
          )}

          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            className="w-[400px] h-[500px]"
            hidden
            required
          />
          {!image ? <p className="text-sm text-gray-700">Upload here</p> : null}
        </label>
        <div className="flex flex-col">
          <label htmlFor="description">
            <p className="text-sm">Description</p>
            <input
              onChange={(e) => setCaption(e.target.value)}
              value={caption}
              placeholder="Add a detailed description"
              type="text"
              id="description"
              className=" bg-gray-300 placeholder-gray-700 pt-2 pl-3 pb-20 pr-5 rounded w-[500px] "
              required
            />
          </label>
          <div className="mt-3 flex justify-end ">
            <button
              className="text-lg border-2 border-gray-400 bg-gray-200 hover:bg-gray-500 hover:text-white py-3 px-6 rounded-full   transition-all font-bold "
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

export default Post;
