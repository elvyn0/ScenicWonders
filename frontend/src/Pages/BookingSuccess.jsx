import { Link } from "react-router-dom";
import assets from "../assets/assets";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

// After strip booking success page
function BookingSuccess() {
  const { api } = useContext(AppContext);

  useEffect(() => {
    const bookingData = JSON.parse(localStorage.getItem("bookingData"));

    if (!bookingData) return;

    // save booking
    const saveBooking = async () => {
      try {
        const response = await api.post("/api/bookings/create", bookingData);
        if (response.data.success) {
          toast.success(response.data.message);
          localStorage.removeItem("bookingData");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    };
    saveBooking();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md text-center max-w-md">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Payment Successful</h1>

        <img src={assets.payment_Success} className="max-w-[350px] mb-6" />

        <Link
          to="/"
          className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition no-underline font-bold"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default BookingSuccess;
