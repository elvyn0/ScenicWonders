import { assets } from "../../../assets/assets";

function PaymentMethod() {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-5">
      <h3 className="text-lg font-semibold text-gray-800">Payment Method</h3>

      {/* Stripe Option */}
      <label className="flex items-center justify-between border rounded-xl px-4 py-3 cursor-pointer hover:border-black transition">
        <div className="flex items-center gap-3">
          <input type="radio" name="payment" value="stripe" className="accent-black" defaultChecked />
          <span className="text-sm font-medium text-gray-700">Pay with Stripe</span>
        </div>

        <img className="h-6 object-contain" src={assets.stripe} alt="Stripe" />
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition"
      >
        Pay Now
      </button>
    </div>
  );
}

export default PaymentMethod;
