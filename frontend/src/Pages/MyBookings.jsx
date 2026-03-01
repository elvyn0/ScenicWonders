import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";
import { toast } from "react-hot-toast";
import { assets } from "../assets/assets";

function MyBookings() {
  const { api, token } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const response = await api.get("/api/bookings/myBookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setBookings(response.data.myBookings);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center sm:bg-black/50 sm:backdrop-blur-sm ml-[4%]">
      <div
        className="w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-2xl 
                  overflow-y-auto bg-white sm:rounded-2xl sm:shadow-2xl p-4 sm:p-6"
      >
        <div className="sticky top-[-22px] bg-red-600 text-center p-3 rounded-md mb-4">
          <h1 className="font-bold text-white text-lg">My Bookings</h1>
        </div>

        {bookings.length === 0 && <p className="text-center text-gray-500 mt-10">No bookings yet.</p>}

        <div className="flex flex-col gap-4">
          {bookings.map((item) => (
            <div key={item._id} className="bg-gray-50 rounded-xl shadow-md p-4 sm:p-6 flex flex-col gap-4">
              {/* Top Section */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-40 flex-shrink-0">
                  <img src={item.hotelImage?.url} className="w-full h-32 object-cover rounded-lg" />
                </div>

                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h2 className="font-semibold text-lg">{item.hotel?.name}</h2>
                    <p className="text-gray-500 text-sm">{item.hotel?.location}</p>
                  </div>

                  <div className="text-sm mt-2 space-y-1">
                    <p>
                      <span className="font-medium">Check-in:</span> {new Date(item.checkInDate).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-medium">Check-out:</span> {new Date(item.checkOutDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex justify-between text-sm mt-3">
                    <p>
                      Rooms: <span className="font-semibold">{item.numberOfRooms}</span>
                    </p>
                    <p>
                      Guests: <span className="font-semibold">{item.numberOfGuests}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="border-t pt-3 text-center space-y-2">
                <h3 className="font-semibold text-green-600">Booking Confirmed 🎉</h3>
                <p className="text-sm text-gray-500">Show QR at hotel reception</p>
                <div className="p-2 bg-gray-200 rounded-lg flex items-center justify-center">
                  <img className="size-28" src={assets.QR} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyBookings;
