import { useState } from "react";
import { assets } from "../assets/assets";
import HotelSummery from "../components/hotels/HotelSummery";
import PaymentMethod from "../components/hotels/PaymentMethod";
import BookingForm from "../components/hotels/BookingForm";
import PriceBreakdown from "../components/hotels/PriceBreakdown";
import { useParams, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/appContext";
import toast from "react-hot-toast";

function Booknow() {
  const { api, token, user } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { hotelId } = useParams();

  const [params] = useSearchParams();
  const hotelName = params.get("hotelName");
  const pricePerNight = params.get("price");
  const nights = params.get("nights");
  const guests = params.get("guests");
  const rooms = params.get("rooms");
  const checkIn = params.get("checkIn");
  const checkOut = params.get("checkOut");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError(null);

      const bookingData = {
        hotelId,
        numberOfRooms: rooms,
        numberOfGuests: guests,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        ...formData,
      };

      /// Saving locally
      localStorage.setItem("bookingData", JSON.stringify(bookingData));

      const response = await api.post(
        "/api/payment/create-checkout-session",
        {
          hotelId,
          hotelName,
          nights,
          rooms,
          pricePerNight,
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.success) {
        window.location.href = response.data.url;
        setError(null);
      } else {
        toast.error(response.data.message);
        setError("Failed to load data");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
      setError("Server not responding...");
    } finally {
      setLoading(false);
    }
  };

  // Handling Loading state //
  if (loading)
    return (
      <div className="text-center">
        <p className="text-blue-600 font-bold text-lg">Loading Data...</p>
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
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Top Bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <img src={assets.sw_logo} className="h-10 object-contain" />
          <img src={assets.inFlag} className="h-10 w-10 rounded-full object-cover border border-gray-200" />
        </div>
      </div>

      {/* Security Strip */}
      <div className="bg-gray-100 border-y border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6 py-3 text-sm font-medium text-gray-600 tracking-wide">
          <span>🔒 Secure Transactions</span>
          <span>⏰ 24-Hour Service</span>
          <span>💳 Trusted Payments</span>
        </div>
      </div>
      {!user && <p className="text-sm text-red-500 text-center mb-0">Please login to proceed with payment</p>}
      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 mt-10">
        {/* Left - Hotel Summary */}
        <div className="md:col-span-1">
          <HotelSummery />
        </div>

        {/* Right - Booking + Payment */}
        <div className="md:col-span-2 space-y-6">
          <form onSubmit={onSubmitHandler}>
            <BookingForm formData={formData} handleChange={handleChange} />
            <PriceBreakdown pricePerNight={pricePerNight} totalNights={nights} rooms={rooms} />
            <PaymentMethod />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Booknow;
