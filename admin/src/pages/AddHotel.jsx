import React, { useState } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-hot-toast";
import api from "../api/axios";

function AddHotel({ token }) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [hotelImage, setHotelImage] = useState(null);
  const [roomImage1, setRoomImage1] = useState(null);
  const [roomImage2, setRoomImage2] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [totalRooms, setTotalRooms] = useState("");
  const [location, setLocation] = useState("");
  const [weekendDeals, setWeekendDeals] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      setUploading(true);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("pricePerNight", Number(pricePerNight));
      formData.append("totalRooms", Number(totalRooms));
      formData.append("location", location);
      formData.append("weekendDeals", String(weekendDeals));

      if (hotelImage) formData.append("hotelImage", hotelImage);
      if (roomImage1) formData.append("roomImage1", roomImage1);
      if (roomImage2) formData.append("roomImage2", roomImage2);
      const response = await api.post("/api/hotels/create", formData, {
        headers: { token },
        onUploadProgress: (ProgressEvent) => {
          if (!ProgressEvent.total) return;
          const percent = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total);
          setUploadProgress(percent);
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setLocation("");
        setPricePerNight("");
        setTotalRooms("");
        setHotelImage(null);
        setRoomImage1(null);
        setRoomImage2(null);
        setUploading(false);
        setUploadProgress(0);
        setWeekendDeals(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };
  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-5 items-center  pt-10">
      <div>
        <h1 className="text-5xl mb-5 font-bold">Add Hotels </h1>
      </div>
      {/* Image upload field */}
      <div>
        <p className="text-gray-700"> Upload image</p>
        <div className="flex flex-row gap-3 mt-2">
          <div>
            <label htmlFor="hotelImage">
              <img className="w-30" src={!hotelImage ? assets.uploadImg : URL.createObjectURL(hotelImage)} />
              <input onChange={(e) => setHotelImage(e.target.files[0])} id="hotelImage" type="file" hidden />
            </label>
          </div>
          <div>
            <label htmlFor="roomImage1">
              <img className="w-30" src={!roomImage1 ? assets.uploadImg : URL.createObjectURL(roomImage1)} />
              <input onChange={(e) => setRoomImage1(e.target.files[0])} id="roomImage1" type="file" hidden />
            </label>
          </div>
          <div>
            <label htmlFor="roomImage2">
              <img className="w-30" src={!roomImage2 ? assets.uploadImg : URL.createObjectURL(roomImage2)} />
              <input onChange={(e) => setRoomImage2(e.target.files[0])} id="roomImage2" type="file" hidden />
            </label>
          </div>
        </div>
        {/* Hotel name field */}
        <div className="w-full mt-5">
          <p className="mb-2 text-gray-700">Hotel name :</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full max-w-125 py-1 pl-2 pr-12 border rounded-sm  "
            required
            type="text"
            placeholder="eg: Hotel Star"
          />
        </div>
        {/* Description field */}
        <div className="w-full mt-5">
          <p className="mb-2 text-gray-700">Description :</p>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="w-full max-w-125 px-3 py-2  border rounded-sm"
            required
            type="text"
            placeholder="Type here"
          />
        </div>
        {/* Location field */}

        <div className="w-full mt-5">
          <p className="mb-2 text-gray-700">Location :</p>
          <input
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            className="w-full max-w-125 px-3 py-2 border rounded-sm"
            required
            type="text"
            placeholder="eg:Kerala / Delhi / ..."
          />
        </div>
        {/* Total Rooms */}
        <div className="w-full mt-5">
          <p className="mb-2 text-gray-700">Total Rooms :</p>
          <input
            onChange={(e) => setTotalRooms(e.target.value)}
            value={totalRooms}
            className="w-full max-w-125 px-3 py-2  border rounded-sm"
            required
            type="number"
            placeholder="eg: 100 "
          />
        </div>
        {/* Price  */}
        <div className="w-full mt-5">
          <p className="mb-2 text-gray-700">Price per Night :</p>
          <input
            onChange={(e) => setPricePerNight(e.target.value)}
            value={pricePerNight}
            className="w-full max-w-125 px-3 py-2 border rounded-sm"
            required
            type="number"
            placeholder="Type here"
          />
        </div>
        {/* Weekend deals */}
        <div className="flex gap-2 mt-5 text-xl">
          <input
            onChange={() => setWeekendDeals((prev) => !prev)}
            checked={weekendDeals}
            id="bestseller"
            type="checkbox"
          />
          <label className="cursor-pointer " htmlFor="bestseller">
            Set Weekend deal
          </label>
        </div>
      </div>
      {uploading && (
        <div className="w-full max-w-125 bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-black h-2 rounded-full transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}
      <button
        type="submit"
        disabled={uploading}
        className={`py-2 px-10 rounded-sm mt-4 mb-16 text-white hover:cursor-pointer
    ${uploading ? "bg-gray-400 cursor-not-allowed" : "bg-black"}
  `}
      >
        {uploading ? "Uploading…" : "Upload"}
      </button>
    </form>
  );
}

export default AddHotel;
