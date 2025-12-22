import React from "react";
import { assets } from "../assets/assets";

function PostCategories() {
  return (
    <div>
      <div>
        <h1 className="font-bold text-3xl flex justify-start mb-9">Posts</h1>
      </div>
      {/*User Posts */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
        {/* User 1 */}
        <div className="flex ">
          <img className="rounded-2xl w-full " src={assets.tamilnadu} alt="Tamilnadu" />
        </div>
        {/* User 2 */}
        <div className="flex">
          <img className="rounded-2xl w-full " src={assets.andhrapradesh} alt="Andhrapradesh" />
        </div>
        {/* User 3 */}
        <div className="flex">
          <img className="rounded-2xl w-full" src={assets.goaB} alt="Goa" />
        </div>
        {/* User 4 */}
        <div className="flex">
          <img className="rounded-2xl w-full" src={assets.himalayaB} alt="Himalaya" />
        </div>
        {/* User 5 */}
        <div className="flex">
          <img className="rounded-2xl w-full" src={assets.lakshadweepB} alt="Lakshadweep" />
        </div>
        {/* User 6 */}
        <div className="flex">
          <img className="rounded-2xl w-full" src={assets.lakshadweepB} alt="Lakshadweep" />
        </div>
      </div>
    </div>
  );
}

export default PostCategories;
