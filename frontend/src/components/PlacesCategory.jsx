import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

function PlacesCategory() {
  return (
    <div className="px-4 md:px-8">
      {/* Title */}
      <h1 className="font-bold text-lg md:text-2xl mb-6">Places</h1>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
        {/* Card */}
        <NavLink to="/nepal">
          <div className="relative group">
            <img className="w-full h-32 sm:h-40 md:h-60 object-cover rounded-xl" src={assets.nepal} alt="Nepal" />

            <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white py-2 rounded-b-xl">
              <h1 className="text-center text-sm md:text-lg font-semibold">Nepal</h1>
            </div>
          </div>
        </NavLink>

        <NavLink to="/rajasthan">
          <div className="relative">
            <img className="w-full h-32 sm:h-40 md:h-60 object-cover rounded-xl" src={assets.rajasthan} />
            <div className="absolute bottom-0 w-full bg-black/50 text-white py-2 rounded-b-xl">
              <h1 className="text-center text-sm md:text-lg font-semibold">Rajasthan</h1>
            </div>
          </div>
        </NavLink>

        <NavLink to="/tamilnadu">
          <div className="relative">
            <img className="w-full h-32 sm:h-40 md:h-60 object-cover rounded-xl" src={assets.tamilNadu} />
            <div className="absolute bottom-0 w-full bg-black/50 text-white py-2 rounded-b-xl">
              <h1 className="text-center text-sm md:text-lg font-semibold">Tamil Nadu</h1>
            </div>
          </div>
        </NavLink>

        <NavLink to="/kerala">
          <div className="relative">
            <img className="w-full h-32 sm:h-40 md:h-60 object-cover rounded-xl" src={assets.kerala} />
            <div className="absolute bottom-0 w-full bg-black/50 text-white py-2 rounded-b-xl">
              <h1 className="text-center text-sm md:text-lg font-semibold">Kerala</h1>
            </div>
          </div>
        </NavLink>

        <NavLink to="/maharashtra">
          <div className="relative">
            <img className="w-full h-32 sm:h-40 md:h-60 object-cover rounded-xl" src={assets.maharashtra} />
            <div className="absolute bottom-0 w-full bg-black/50 text-white py-2 rounded-b-xl">
              <h1 className="text-center text-sm md:text-lg font-semibold">Maharashtra</h1>
            </div>
          </div>
        </NavLink>

        <NavLink to="/punjab">
          <div className="relative">
            <img className="w-full h-32 sm:h-40 md:h-60 object-cover rounded-xl" src={assets.punjab} />
            <div className="absolute bottom-0 w-full bg-black/50 text-white py-2 rounded-b-xl">
              <h1 className="text-center text-sm md:text-lg font-semibold">Punjab</h1>
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default PlacesCategory;
