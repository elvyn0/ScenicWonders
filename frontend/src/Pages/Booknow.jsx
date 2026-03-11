import { useState } from "react";
import { assets } from "../assets/assets";
import HotelSummery from "../components/hotels/HotelSummery";
import PaymentMethod from "../components/hotels/PaymentMethod";
import BookingForm from "../components/hotels/BookingForm";
import PriceBreakdown from "../components/hotels/PriceBreakdown";
import { useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/appContext";
import toast from "react-hot-toast";

function Booknow() {
  const { api } = useContext(AppContext);

  const [params] = useSearchParams();

  const hotelName = params.get("hotelName");
  const nights = Number(params.get("nights"));
  const pricePerNight = Number(params.get("price"));
  const rooms = Number(params.get("rooms"));

  const [formdata, setFormdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post("/api/payment/create-checkout-session", {
        hotelName,
        pricePerNight,
        nights,
        rooms,
        ...formdata,
      });
      if (response.data.success) {
        window.location.href = response.data.url;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 mt-10">
        {/* Left - Hotel Summary */}
        <div className="md:col-span-1">
          <HotelSummery />
        </div>

        {/* Right - Booking + Payment */}
        <div className="md:col-span-2 space-y-6">
          <form onSubmit={onSubmitHandler}>
            <BookingForm formdata={formdata} handleChange={handleChange} />
            <PriceBreakdown pricePerNight={pricePerNight} totalNights={nights} rooms={rooms} />
            <PaymentMethod />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Booknow;
