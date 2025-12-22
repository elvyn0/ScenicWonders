import { assets } from "../assets/assets";

function Booknow() {
  const onSubmitHandler = async (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmitHandler} className=" pt-3 mb-[100px]">
      <div className=" flex justify-between px-[8%]  ">
        <img src={assets.sw_logo} className="size-10 " />
        <img src={assets.inFlag} className="size-10 rounded-full p-1" />
      </div>
      <hr className="mb-0" />
      <div className=" flex  flex-row gap-5 justify-center items-center text-sm bg-gray-50 font-serif mb-3 ">
        <p>SECURE TRANSATIONS</p>
        <p>24-HOURS SERVICE</p>
        <p>TRUSTED PAYMENTS</p>
      </div>
      {/* Choosed hotel deatiles */}

      <div className="flex flex-col gap-3 justify-center items-center  ">
        <div className="border-2 rounded-lg p-2 shadow-sm border-gray-300">
          <p className="mb-0">
            <span className="font-bold text-lg">Almost done!</span>Enter your details and complete your booking now.
          </p>
          <div className="flex flex-1 flex-row gap-3 rounded-md border p-3">
            <div className="max-w-[300px]">
              <img src={assets.tamilNadu} className=" w-full  rounded-lg" />
            </div>
            <div className="w-full">
              <h2>Hilton Bnasgfafghoafjhashf</h2>
              <p>Kerala</p>
              <p>4***</p>
            </div>
          </div>
          <div className=" w-full bg-blue-100 mt-1 rounded-lg flex flex-col pr-2 pt-2">
            <ul className="flex justify-between">
              <li>CHECK-IN</li>
              <li>CHECK-OUT</li>
              <li>NIGHTS</li>
              <li>ROOMS</li>
            </ul>
            <ul className="flex justify-between text-sm">
              <li>jan 11,Sun,2026</li>
              <li>Tue,jan 14,2026</li>
              <li>2</li>
              <li>1</li>
            </ul>
          </div>
        </div>

        <div className=" flex flex-1 flex-col gap-3 ">
          {/* field booking user info */}
          <div className=" border-2 shadow-sm border-gray-300 p-2 rounded-lg  w-full ">
            <div className="mb-0">
              <p className="font-bold text-lg mb-0">Contact details</p>
              <p className="text-sm">This is where your confirmation will be sent:</p>
            </div>
            <div className="border rounded-lg p-3 ">
              <div className="flex gap-5 mb-3 ">
                <input
                  className="border-2 pl-8 py-2 rounded-xl border-gray-300"
                  type="text"
                  placeholder="First name"
                  required
                />
                <input
                  className="border-2 pl-8 py-2 rounded-xl border-gray-300"
                  type="text"
                  placeholder="last name"
                  required
                />
              </div>
              <input
                className="border-2 pl-8 py-2 rounded-xl border-gray-300 mb-3"
                type="email"
                placeholder="Enter your e-mail "
                required
              />
              <div className="flex gap-5 mb-3">
                <input
                  className="border-2 pl-8 py-2 rounded-xl border-gray-300"
                  type="text"
                  placeholder="Zip code"
                  required
                />
                <input
                  className="border-2 pl-8 py-2 rounded-xl border-gray-300"
                  type="text"
                  placeholder="country"
                  required
                />
              </div>
              <input
                className="border-2 pl-8 py-2 rounded-xl border-gray-300 "
                type="text "
                placeholder="Phone"
                required
              />
            </div>
          </div>

          {/* price and  Payment deatiles */}

          <div className="  border-2 rounded-lg shadow-sm border-gray-300 p-4">
            <div className="flex flex-row justify-between text-sm">
              <div className="font-semibold ">
                <p>Price per-Night</p>
                <p>Taxes and fees</p>
                <hr />
                <p className="text-green-600 text-lg">Total charges</p>
              </div>

              <div className="font-bold">
                <p>3000</p>
                <p>1000</p>
                <hr />
                <p className="text-green-600 text-lg">4000</p>
              </div>
            </div>
          </div>
        </div>
        {/* Payment method */}
        <div className=" border-2 rounded-lg shadow-sm border-gray-300 p-4">
          <div className="flex items-center gap-3 mb-1  p-2 px-3 cursor-pointer">
            <p className="border-2 rounded-full p-1  border-gray-500"></p>
            <img className="w-full" src={assets.stripe} />
          </div>
        </div>
      </div>
    </form>
  );
}

export default Booknow;
