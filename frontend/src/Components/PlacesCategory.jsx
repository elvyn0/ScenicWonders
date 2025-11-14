import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

function PlacesCategory() {
  return (
    <div>
      <div>
        <h1 className="font-bold text-3xl flex justify-start mb-9">Placeses</h1>
      </div>
      <div className="w-full sm:w-1/2py-10 sm:py-0">
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 gap-y-8 ">
          {/* First Image with Overlay Text */}
          <NavLink to="/nepal">
            <div className="relative">
              <img className="rounded-[11%] " src={assets.nepal} alt="Nepal" />
              <div className="absolute bottom-10 left-0 bg-gray-900 bg-opacity-50 text-white w-full p-2 rounded-bl-2xl rounded-br-2xl">
                <h1 className="font-bold text-lg text-center">Nepal</h1>
              </div>
            </div>
          </NavLink>
          {/* Second Image with Overlay Text */}
          <NavLink to="/rajasthan">
            <div className="relative">
              <img className="rounded-[11%]" src={assets.rajasthan} alt="Rajasthan" />
              <div className="absolute bottom-10 left-0 bg-gray-900 bg-opacity-50 text-white w-full p-2 rounded-bl-2xl rounded-br-2xl">
                <h1 className="font-bold text-lg text-center">Rajasthan</h1>
              </div>
            </div>
          </NavLink>
          {/* Third Image with Overlay Text */}
          <NavLink to="/tamilnadu">
            <div className="relative">
              <img className="rounded-[11%]" src={assets.tamilNadu} alt="TamilNadu" />
              <div className="absolute bottom-10 left-0 bg-gray-900 bg-opacity-50 text-white w-full p-2 rounded-bl-2xl rounded-br-2xl">
                <h1 className="font-bold text-lg text-center">Tamil Nadu</h1>
              </div>
            </div>
          </NavLink>
          {/* Fourth Image with Overlay Text */}
          <NavLink to="/kerala">
            <div className="relative">
              <img className="rounded-[11%]" src={assets.kerala} alt="Kerala" />
              <div className="absolute bottom-10 left-0 bg-gray-900 bg-opacity-50 text-white w-full p-2 rounded-bl-2xl rounded-br-2xl">
                <h1 className="font-bold text-lg text-center">Kerala</h1>
              </div>
            </div>
          </NavLink>
          {/* Fifth Image with Overlay Text */}
          <NavLink to="/maharashtra">
            <div className="relative">
              <img className="rounded-[11%]" src={assets.maharashtra} alt="Maharashtra" />
              <div className="absolute bottom-10 left-0 bg-gray-900 bg-opacity-50 text-white w-full p-2 rounded-bl-2xl rounded-br-2xl">
                <h1 className="font-bold text-lg text-center">Maharashtra</h1>
              </div>
            </div>
          </NavLink>
          {/* Sixth Image with Overlay Text */}
          <NavLink to="/punjab">
            <div className="relative">
              <img className="rounded-[11%]" src={assets.punjab} alt="Punjab" />
              <div className="absolute bottom-10 left-0 bg-gray-900 bg-opacity-50 text-white w-full p-2 rounded-bl-2xl rounded-br-2xl">
                <h1 className="font-bold text-lg text-center">Punjab</h1>
              </div>
            </div>
          </NavLink>
        </div>
      </div>
      <div className="text-center w-full mt-20 ">
        <Link to="" className="font-bold bg-gray-200 rounded-xl px-5 p-3 no-underline text-inherit ">
          See more
        </Link>
      </div>
    </div>
  );
}

export default PlacesCategory;
