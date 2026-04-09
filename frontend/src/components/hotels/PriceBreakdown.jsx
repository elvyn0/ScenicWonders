function PriceBreakdown({ pricePerNight, totalNights, rooms }) {
  // Calculating base price //
  const basePrice = pricePerNight * totalNights * rooms;
  // Tax 12% //
  const tax = Math.round(basePrice * 0.12);

  const totalPrice = basePrice + tax;

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 md:col-span-1">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Price Summary</h3>

      <div className="space-y-3 text-sm">
        {/* Rooms */}
        <div className="flex justify-between text-gray-600">
          <span>Total Rooms</span>
          <span className="font-medium text-gray-800">{rooms}</span>
        </div>
        {/* Nights */}
        <div className="flex justify-between text-gray-600">
          <span>Total Nights</span>
          <span className="font-medium text-gray-800">
            {totalNights && totalNights !== "NaN" && totalNights !== "undefined" && totalNights !== "null"
              ? totalNights
              : 0}
          </span>
        </div>
        {/* Price per nights */}
        <div className="flex justify-between text-gray-600">
          <span>Price per night</span>
          <span className="font-medium text-gray-800">₹{pricePerNight}</span>
        </div>
        {/* total Price  without tax */}
        <div className="flex justify-between text-gray-600">
          <span className="font-medium text-sm ">
            ₹{pricePerNight} x {totalNights} Night{totalNights > 1 ? "s" : ""} x {rooms} Room{rooms > 1 ? "s" : ""}
          </span>
          <p className="text-gray-800">
            ₹{basePrice && basePrice !== "NaN" && basePrice !== "null" && basePrice !== "undefined" ? basePrice : 0}
          </p>
        </div>
        {/* Taxes and fees */}
        <div className="flex justify-between text-gray-600">
          <span>Taxes & fees</span>
          <span className="font-medium text-gray-800">
            ₹{tax && tax !== "NaN" && tax !== "null" && tax !== "undefined" ? tax : 0}
          </span>
        </div>
        {/* Price */}
        <div className="border-t pt-4 flex justify-between text-base font-semibold">
          <span>Total Price</span>
          <span className="text-green-600">
            ₹
            {totalPrice && totalPrice !== "NaN" && totalPrice !== "null" && totalPrice !== "undefined" ? totalPrice : 0}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PriceBreakdown;
