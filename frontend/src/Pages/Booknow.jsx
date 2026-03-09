import { useState } from "react";
import { assets } from "../assets/assets";
import HotelSummery from "../components/hotels/HotelSummery";
import PaymentMethod from "../components/hotels/PaymentMethod";
import BookingForm from "../components/hotels/BookingForm";
import PriceBreakdown from "../components/hotels/PriceBreakdown";

function Booknow() {
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
        <div className="md:col-span-2">
          <form onSubmit={onSubmitHandler} className="space-y-6">
            <BookingForm formdata={formdata} handleChange={handleChange} />
            <PriceBreakdown />
            <PaymentMethod />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Booknow;
