import { useContext, useState } from "react";
import { GrUploadOption } from "react-icons/gr";
import { AppContext } from "../context/appContext";
import { toast } from "react-hot-toast";

function Post() {
  const { api, token } = useContext(AppContext);
  const [image, setImage] = useState(false);
  const [caption, setCaption] = useState("");
  const [Uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUploading(true);

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
    } finally {
      setUploading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="pt-5 px-4 md:px-[5%]">
      <h3 className="font-bold mb-5 text-lg md:text-xl">Create Post</h3>

      <div className="flex flex-col md:flex-row gap-5 items-center justify-center mt-5">
        {/* Image Upload */}
        <label
          htmlFor="image"
          className="cursor-pointer bg-gray-300 w-full max-w-[350px] aspect-[4/5] flex flex-col justify-center items-center rounded-3xl overflow-hidden"
        >
          {!image ? (
            <>
              <GrUploadOption className="size-8 md:size-10 mb-3" />
              <p className="text-sm text-gray-700">Upload here</p>
            </>
          ) : (
            <img className="w-full h-full object-cover" src={URL.createObjectURL(image)} />
          )}

          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </label>

        {/* Form Fields */}
        <div className="flex flex-col w-full max-w-[500px]">
          <label htmlFor="description">
            <p className="text-sm mb-1">Description</p>

            <textarea
              onChange={(e) => setCaption(e.target.value)}
              value={caption}
              placeholder="Add a detailed description"
              id="description"
              className="bg-gray-300 placeholder-gray-700 p-3 rounded w-full min-h-[120px] resize-none"
              required
            />
          </label>

          <div className="mt-4 flex justify-end">
            <button
              className={`text-sm md:text-lg border-2 border-gray-200  hover:bg-gray-200  py-2 md:py-3 px-5 md:px-6 rounded-full transition duration-300 font-bold w-full md:w-auto `}
              type="submit"
              disabled={Uploading}
            >
              {Uploading ? "Uploading..." : "Create"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Post;
