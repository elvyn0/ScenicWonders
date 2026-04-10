import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/appContext";
import toast from "react-hot-toast";

function EditProfileModel({ setShowEdit, profile, setProfile }) {
  const { api, token } = useContext(AppContext);
  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState("");
  const [updating, setUpdating] = useState(false);

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);

      const formData = new FormData();
      if (name.trim()) {
        formData.append("name", name);
      }
      profilePic && formData.append("profilePic", profilePic);

      const response = await api.put("/api/user/update-profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setProfile(response.data.updatedUser);
        toast.success("Profile Updated");
        setName("");
        setProfilePic(null);
        setShowEdit(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setUpdating(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white py-2 px-2 rounded-lg w-[90%] max-w-md">
        <div className="flex justify-end">
          <p onClick={() => setShowEdit(false)} className="bg-gray-100 rounded-full w-8 p-2 cursor-pointer font-bold">
            X
          </p>
        </div>
        <form onSubmit={handelSubmit} className="text-center">
          {/* Update Profile pic */}
          <p className="text-sm  text-gray-500 font-semibold mb-3 text-start">Edit Profile pic :</p>
          <div className="flex flex-col items-center">
            <label htmlFor="updateProfilePic">
              <img
                className="w-52 hover:cursor-pointer "
                src={profilePic ? URL.createObjectURL(profilePic) : profile.profilePic || assets.upLoad}
              />
              <p className="text-sm text-gray-500 mt-1">Click to change </p>
            </label>
            <input onChange={(e) => setProfilePic(e.target.files[0])} type="file" id="updateProfilePic" hidden />
          </div>
          {/* Update user name */}
          <div className="flex flex-col mt-4">
            <p className="text-sm  text-gray-500 font-semibold mb-2 text-start">Edit user name :</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border px-2 py-2 rounded-md"
              type="text"
              placeholder={profile.name}
            />
          </div>
          <button
            type="submit"
            disabled={updating}
            className="mt-4 border px-4 py-2 rounded-lg bg-black text-white font-semibold "
          >
            {updating ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModel;
