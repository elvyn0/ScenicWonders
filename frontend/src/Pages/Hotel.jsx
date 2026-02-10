import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../context/appContext";

import toast from "react-hot-toast";

function Hotel() {
  const { hotelId } = useParams();
  const { api } = useContext(AppContext);
  const [hotel, setHotel] = useState(null);

  const fetchHotel = async () => {
    try {
      const response = await api.get(`/api/hotels/${hotelId}`);
      if (response.data.success) {
        setHotel(response.data.hotel);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchHotel();
  }, [hotelId]);

  return (
    <div className="flex items-center justify-center mx-[10%] pt-10 shadow-lg">
      {/* hotel detailed  info  */}
      {hotel && (
        <div className="flex flex-1 flex-col gap-2 items-center p-5 border border-gray-500">
          <img src={hotel.hotelImage?.url} className="max-w-[500px]" />
          <h3>{hotel.name}</h3>
          <p>{hotel.description}</p>
        </div>
      )}
      {/* payment */}
      <div className="border-l-2 p-2 ">
        <p>5 star</p>
        <a target="_blank" href="/booknow">
          <button className="bg-red-700 text-white py-2 px-5 rounded-md font-bold">Book now</button>
        </a>
      </div>
      {/*  */}
      <div></div>
    </div>
  );
}

export default Hotel;
