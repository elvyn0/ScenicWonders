import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../context/appContext";
import { assets } from "../assets/assets";

function Hotel() {
  const { hotelId } = useParams();
  const { hotels, currency } = useContext(AppContext);
  const [hotelData, setHotelData] = useState(false);
  const [image, setImage] = useState([]);

  const fetchHotelData = async () => {
    hotels.map((item) => {
      try {
        if (item.id === hotelId) {
          setHotelData(item);
          setImage(item.image);
          return null;
        }
      } catch (error) {
        console.error(error);
      }
    });
  };

  useEffect(() => {
    fetchHotelData();
  }, [hotels, hotelId]);

  return (
    <div className="flex items-center justify-center mx-[10%] pt-10 shadow-lg">
      {/* hotel detailed  info  */}
      <div className=" flex  flex-1 flex-col gap-2  items-center p-5 border border-gray-500">
        {/* hotel images */}
        <div>
          <img src={assets.kerala} className="w-[600px]" />
        </div>
        {/* hotel info and pyment button */}
        <div>
          <div className="flex flex-row gap-3 border-t-2 pt-2">
            <div className="flex-1">
              <h3>sun flower</h3>
              <p>
                Award-winning gardens with century-old raintrees are featured throughout The Oberoi Bangalore, a 5-star
                property on the prestigious Mahatma Gandhi Road. Pampering spa treatments and a gym are provided.
                Personal butlers and room service are available 24 hours. Complimentary WiFi is available in all rooms.
              </p>
            </div>
            {/* payment */}
            <div className="border-l-2 p-2 ">
              <p>5 star</p>
              <a target="_blank" href="/booknow">
                <button className="bg-red-700 text-white py-2 px-5 rounded-md font-bold">Book now</button>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div></div>
    </div>
  );
}

export default Hotel;
