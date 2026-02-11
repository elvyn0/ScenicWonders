import React from "react";

function PriceBreakdown() {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 md:col-span-1">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Price Summary</h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Price per night</span>
          <span className="font-medium text-gray-800">₹3,000</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Taxes & fees</span>
          <span className="font-medium text-gray-800">₹1,000</span>
        </div>

        <div className="border-t pt-4 flex justify-between text-base font-semibold">
          <span>Total</span>
          <span className="text-green-600">₹4,000</span>
        </div>
      </div>
    </div>
  );
}

export default PriceBreakdown;
