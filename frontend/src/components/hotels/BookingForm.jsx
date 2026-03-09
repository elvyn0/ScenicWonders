function BookingForm({ formdata, handleChange }) {
  return (
    <div className="w-full bg-white border border-gray-200 shadow-md rounded-2xl p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Contact details</h2>
        <p className="text-sm text-gray-500 mt-1">Your booking confirmation will be sent here.</p>
      </div>

      {/* Form Box */}
      <div className="space-y-4">
        {/* First + Last */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="firstName"
            className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
            onChange={handleChange}
            value={formdata.firstName}
            type="text"
            placeholder="First name"
            required
          />
          <input
            name="lastName"
            className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
            onChange={handleChange}
            value={formdata.lastName}
            type="text"
            placeholder="Last name"
            required
          />
        </div>

        {/* Email */}
        <input
          name="email"
          className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
          onChange={handleChange}
          value={formdata.email}
          type="email"
          placeholder="Enter your email"
          required
        />

        {/* Zip + Country */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="zipCode"
            className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
            onChange={handleChange}
            value={formdata.zipCode}
            type="numeric"
            placeholder="Zip code"
            required
          />
          <input
            name="country"
            className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
            onChange={handleChange}
            value={formdata.country}
            type="text"
            placeholder="Country"
            required
          />
        </div>

        {/* Phone */}
        <input
          name="phone"
          className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
          onChange={handleChange}
          value={formdata.phone}
          type="numaric"
          placeholder="Phone number"
          required
        />
      </div>
    </div>
  );
}

export default BookingForm;
