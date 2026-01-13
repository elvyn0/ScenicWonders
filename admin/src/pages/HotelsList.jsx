import { useState } from "react";

function HotelsList() {
  const [active, setActive] = useState("hotels");
  const rotated = active === "deleted";

  return (
    <div className=" flex flex-col gap-10  items-center justify-center pt-10 bg-gray-100   ">
      {/* Rotating pill */}
      <div
        className={` flex flex-col text-center rounded-[100%]     cursor-pointer transition-transform duration-500 ${
          active === "deleted" ? "rotate-180  " : "rotate-0"
        }  `}
      >
        <button
          onClick={() => setActive("hotels")}
          className="border-b-2  p-8 bg-blue-700 rounded-t-full border-t border-blue-900"
        >
          <p
            className={` text-white font-semibold transition-transform duration-500  ${
              rotated ? "-rotate-180" : "rotate-0"
            }`}
          >
            Hotels List
          </p>
        </button>
        <button onClick={() => setActive("deleted")} className="p-8 bg-red-700 rounded-b-full border-b border-red-700">
          <p
            className={`text-white font-semibold transition-transform duration-500 ${
              rotated ? "-rotate-180" : "rotate-0"
            }`}
          >
            Deleted List
          </p>
        </button>
      </div>

      {/* Content */}
      <div className=" relative w-full max-w-md h-40 overflow-hidden ">
        {/* Hotels List */}
        <div
          className={`  absolute w-full transition-all duration-500 ${
            active === "hotels" ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
          }`}
        >
          <div className="p-5 bg-blue-100 rounded-lg text-center">Active Hotels list</div>
        </div>
        {/* Deleted Hotels list */}
        <div
          className={`absolute w-full transition-all duration-500 ${
            active === "deleted" ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
          }`}
        >
          <div className="bg-red-700 rounded-lg text-center">Active Deleted hotels</div>
        </div>
      </div>
    </div>
  );
}

export default HotelsList;
