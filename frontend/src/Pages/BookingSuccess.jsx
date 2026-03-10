import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

function BookingSuccess() {
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
