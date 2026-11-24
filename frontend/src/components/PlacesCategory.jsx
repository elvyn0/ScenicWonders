import { NavLink } from "react-router-dom";
import assets from "../assets/assets";
import { getOptimizedImageUrl } from "../utils/imageOptimizer";

function PlacesCategory() {
  return (
    <div>
      {/* Title */}
      <h1 className="font-extrabold text-red-600 text-lg md:text-5xl mb-6">Places :</h1>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
        {/* Card */}
        <NavLink to="/nepal">
          <div className="relative group">
            <img
              className="w-full h-32 sm:h-40 md:h-60 object-cover rounded-xl bg-gray-200"
              src={getOptimizedImageUrl(assets.nepal, { width: 500 })}
              alt="Nepal"
              loading="eager"
              fetchpriority="high"
              decoding="async"
            />

            <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white py-2 rounded-b-xl">
              <h1 className="text-center text-sm md:text-lg font-semibold">Nepal</h1>
            </div>
          </div>
        </NavLink>

        <NavLink to="/rajasthan">
          <div className="relative group">
            <img
              className="w-full h-32 sm:h-40 md:h-60 object-cover rounded-xl bg-gray-200"
              src={getOptimizedImageUrl(assets.rajasthan, { width: 500 })}
              alt="Rajasthan"
              loading="eager"
              fetchpriority="high"
              decoding="async"
            />
            <div className="absolute bottom-0 w-full bg-black/50 text-white py-2 rounded-b-xl">
              <h1 className="text-center text-sm md:text-lg font-semibold">Rajasthan</h1>
            </div>
          </div>
        </NavLink>

        <NavLink to="/tamilnadu">
          <div className="relative group">
            <img
              className="w-full h-32 sm:h-40 md:h-60 object-cover rounded-xl bg-gray-200"
              src={getOptimizedImageUrl(assets.tamilNadu, { width: 500 })}
              alt="Tamil Nadu"
              loading="eager"
              fetchpriority="high"
              decoding="async"
            />
            <div className="absolute bottom-0 w-full bg-black/50 text-white py-2 rounded-b-xl">
              <h1 className="text-center text-sm md:text-lg font-semibold">Tamil Nadu</h1>
            </div>
          </div>
        </NavLink>

        <NavLink to="/kerala">
          <div className="relative group">
            <img
              className="w-full h-32 sm:h-40 md:h-60 object-cover rounded-xl bg-gray-200"
              src={getOptimizedImageUrl(assets.kerala, { width: 500 })}
              alt="Kerala"
              loading="eager"
              fetchpriority="high"
              decoding="async"
            />
            <div className="absolute bottom-0 w-full bg-black/50 text-white py-2 rounded-b-xl">
              <h1 className="text-center text-sm md:text-lg font-semibold">Kerala</h1>
            </div>
          </div>
        </NavLink>

        <NavLink to="/maharashtra">
          <div className="relative group">
            <img
              className="w-full h-32 sm:h-40 md:h-60 object-cover rounded-xl bg-gray-200"
              src={getOptimizedImageUrl(assets.maharashtra, { width: 500 })}
              alt="Maharashtra"
              loading="eager"
              fetchpriority="high"
              decoding="async"
            />
            <div className="absolute bottom-0 w-full bg-black/50 text-white py-2 rounded-b-xl">
              <h1 className="text-center text-sm md:text-lg font-semibold">Maharashtra</h1>
            </div>
          </div>
        </NavLink>

        <NavLink to="/punjab">
          <div className="relative group">
            <img
              className="w-full h-32 sm:h-40 md:h-60 object-cover rounded-xl bg-gray-200"
              src={getOptimizedImageUrl(assets.punjab, { width: 500 })}
              alt="Punjab"
              loading="eager"
              fetchpriority="high"
              decoding="async"
            />
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
