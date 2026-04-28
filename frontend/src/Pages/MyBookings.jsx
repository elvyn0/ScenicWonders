import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import assets from "../assets/assets";
import { Trash2 } from "lucide-react";

function MyBookings() {
  const { api, token } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookings, setBookings] = useState([]);

  // Fetching Booking deatiles //
  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/api/bookings/myBookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setBookings(response.data.myBookings);
        setError(null);
      } else {
        toast.error(response.data.message);
        setError("Failed to load data");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
      setError("Server not responding...");
    } finally {
      setLoading(false);
    }
  };

  // Handling cancel bookings
  const handlingCancelBooking = async (id) => {
    try {
      const response = await api.patch(
        `/api/bookings/cancelBooking/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        toast("Your amount will be refunded within 3 working day.");
        await fetchBookings();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // Handling Delete booking
  const handleDeleteBooking = async (id) => {
    try {
      const response = await api.delete(`/api/bookings/delete-booking/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchBookings();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Handling Loading state //
  if (loading)
    return (
      <div className="text-center">
        <p className="text-blue-600 font-bold text-sm">Loading Bookings...</p>
      </div>
    );
  // Handling error state //
  if (error)
    return (
      <div className="text-center text-lg text-red-600 font-bold">
        <p>{error}</p>
      </div>
    );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center sm:bg-black/50 sm:backdrop-blur-sm ml-[4%]">
      <div
        className="w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-2xl 
                  overflow-y-auto bg-gray-200 sm:rounded-2xl sm:shadow-2xl p-4 sm:p-6 "
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
                    <p className="text-gray-500 font-semibold text-sm">📍 {item.hotel?.location}</p>
                  </div>

                  <div className="text-sm mt-2 space-y-1">
                    <p className="font-semibold text-md">
                      Booked By:
                      <span className="font-semibold text-lg text-gray-500 ml-1">{item.user?.name}</span>
                    </p>
                    <p className="font-semibold text-md">
                      Check-in:
                      <span className="font-semibold text-lg text-gray-500 ml-1">
                        {new Date(item.checkInDate).toLocaleDateString()}
                      </span>
                    </p>
                    <p className="font-semibold text-md">
                      Check-out:
                      <span className="font-semibold text-lg text-gray-500 ml-1">
                        {new Date(item.checkOutDate).toLocaleDateString()}
                      </span>
                    </p>
                  </div>

                  <div className="flex justify-between text-sm mt-3">
                    <p className="font-semibold text-md">
                      Rooms: <span className=" text-lg text-gray-500 ">{item.numberOfRooms}</span>
                    </p>
                    <p className="font-semibold text-md">
                      Guests: <span className="text-lg text-gray-500">{item.numberOfGuests}</span>
                    </p>
                  </div>
                  <p className="font-semibold text-md">
                    Amount: <span className="text-md text-green-500">{item.totalPrice}</span>
                  </p>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="border-t pt-3 text-center space-y-2">
                <h3 className={`${item.bookingStatus === "Confirmed" ? "text-green-500" : "text-red-500"} font-bold`}>
                  Booking {item.bookingStatus}
                </h3>
                <p className="text-sm text-gray-500">Show QR at hotel reception</p>
                <div className="p-2 bg-gray-200 rounded-lg flex items-center justify-center">
                  <img className="size-28" src={assets.QR} />
                </div>
              </div>
              {/* Cancel booking */}
              {item.bookingStatus === "Confirmed" ? (
                <div onClick={() => handlingCancelBooking(item?._id)} className="flex items-center justify-center">
                  <p className="text-center text-sm bg-red-600 px-3 py-2 text-white font-semibold rounded-full hover:bg-red-800 hover:cursor-pointer">
                    Cancel Booking
                  </p>
                </div>
              ) : (
                ""
              )}
              {/* Delete booking */}
              <div
                onClick={() => handleDeleteBooking(item._id)}
                className="flex justify-center items-center text-red-600 cursor-pointer"
              >
                {item.bookingStatus === "Cancelled" && <Trash2 />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyBookings;
