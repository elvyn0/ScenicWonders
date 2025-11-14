import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import SearchBar_main from "./SearchBar_main";

function storiesCategories() {
  function timeAgo(dateString) {
    const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return interval + "y ago";

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return interval + "mo ago";

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return interval + "d ago";

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return interval + "h ago";

    interval = Math.floor(seconds / 60);
    if (interval >= 1) return interval + "m ago";

    return "Just now";
  }
  return (
    <div>
      <div>
        <h1 className="font-bold text-3xl flex justify-start mb-9">Stories</h1>
      </div>
      {/* Users Content */}
      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 gap-y-8 ">
        {/* User 1 */}
        <div className="border-2 p-5 rounded-xl shadow-lg ">
          <div className="flex w-[60px] mb-10  ">
            <img className="rounded-full" src={assets.maharashtra} />
            <p className="ml-4 font-bold">userName</p>
          </div>

          <p className="ml-5 mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
          <p className="text-gray-500 ml-1 text-sm">{timeAgo()}</p>
        </div>
        {/* User 2 */}

        <div className="border-2 p-5 rounded-xl shadow-lg ">
          <div className="flex w-[60px] mb-10 ">
            <img className="rounded-full" src={assets.maharashtra} />
            <p className="ml-4 font-bold">userName</p>
          </div>

          <p className="ml-5 mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
          <p className="text-gray-500 ml-1 text-sm">{timeAgo()}</p>
        </div>
        {/* User 3 */}
        <div className="border-2 p-5 rounded-xl shadow-lg ">
          <div className="flex w-[60px] mb-10 ">
            <img className="rounded-full" src={assets.maharashtra} />
            <p className="ml-4 font-bold">userName</p>
          </div>

          <p className="ml-5 mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
          <p className="text-gray-500 ml-1 text-sm">{timeAgo()}</p>
        </div>
      </div>

      <div className="text-center w-full mt-20 ">
        <Link to="/stories" className="font-bold bg-gray-200 rounded-xl px-5 p-3 no-underline text-inherit ">
          See more
        </Link>
      </div>
    </div>
  );
}

export default storiesCategories;
