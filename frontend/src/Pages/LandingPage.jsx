import React from "react";
import { assets } from "../assets/assets";
import Navbar from "../Components/Navbar";

function LandingPage() {
  return (
    <div className="relative h-screen flex items-center justify-center bg-gray-900">
      {/**----Background--- */}
      <div className="absolute inset-0">
        <img className="w-full h-full object-cover blur-sm brightness-75" src={assets.banner0} />
      </div>
      {/**--- Foreground card---- */}
      <div
        className="relative bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl 
     w-full sm:max-w-[450px] md:max-w-[650px] lg:max-w-[1200px]"
      >
        <img className="w-full object-cover" src={assets.banner0} />

        <Navbar />
      </div>
    </div>
  );
}

export default LandingPage;
