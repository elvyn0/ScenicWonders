import React, { useState } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-hot-toast";
import api from "../api/axios";

function AddHotel({ token }) {
  const [hotelImage, setHotelImage] = useState(false);
  const [roomImage1, setRoomImage1] = useState(false);
  const [roomImage2, setRoomImage2] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [totalRooms, setTotalRooms] = useState("");
  const [location, setLocation] = useState("");
  const [weekendDeals, setWeekendDeals] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("pricePerNight", Number(pricePerNight));
      formData.append("totalRooms", Number(totalRooms));
      formData.append("location", location);
      formData.append("weekendDeals", String(weekendDeals));

      hotelImage && formData.append("hotelImage", hotelImage);
      roomImage1 && formData.append("roomImage1", roomImage1);
      roomImage2 && formData.append("roomImage2", roomImage2);

      console.log("this is formData", formData);
      console.log("ADMIN TOKEN:", token);

      const responce = await api.post("/api/hotels/create", formData, {
        headers: { token },
      });
      console.log("this iss ittttt", responce);

      if (responce.data.success) {
        toast.success(responce.data.message);
        setName("");
        setDescription("");
        setLocation("");
        setPricePerNight("");
        setTotalRooms("");
        setHotelImage(false);
        setRoomImage1(false);
        setRoomImage2(false);
      } else {
        toast.error(responce.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.responce?.data?.message || "Something went wrong");
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
            className="w-full max-w-[500px] py-1 pl-2 pr-12 border rounded-sm  "
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
            className="w-full max-w-[500px] px-3 py-2  border rounded-sm"
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
            className="w-full max-w-[500px] px-3 py-2 border rounded-sm"
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
            className="w-full max-w-[500px] px-3 py-2  border rounded-sm"
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
            className="w-full max-w-[500px] px-3 py-2 border rounded-sm"
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

      <button className=" py-2 px-10 rounded-sm mt-4 bg-black text-white mb-16" type="submit">
        Add
      </button>
    </form>
  );
}

export default AddHotel;
