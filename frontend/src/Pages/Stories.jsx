import { assets } from "../assets/assets";
import SearchBar_main from "../Components/SearchBar_main";

function Stories() {
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
    <section>
      <SearchBar_main />
      {/* Introduction/Heading */}

      <div className="ml-[7%]">
        <div>
          <h1 className="font-bold text-3xl mt-5 mb-9">Stories</h1>
        </div>

        {/* Stories Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4  items-center">
          {/* User 1 */}
          <article className="border-2 p-5 rounded-xl shadow-lg ">
            {/* Article Header (Profile info) */}
            <header className="flex w-[60px] mb-10">
              <img className="rounded-full" src={assets.maharashtra} alt="User Profile" />
              <p className="ml-4 font-bold">userName</p>
            </header>

            {/* Article Content */}
            <p className="ml-5 mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>

            {/* Article Footer (Metadata like time) */}
            <footer className="text-gray-500 ml-1 text-sm">{timeAgo()}</footer>
          </article>

          {/* User 2 */}
          <article className="border-2 p-5 rounded-xl shadow-lg ">
            <header className="flex w-[60px] mb-10 ">
              <img className="rounded-full" src={assets.maharashtra} alt="User Profile" />
              <p className="ml-4 font-bold">userName</p>
            </header>
            <p className="ml-5 mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
            <footer className="text-gray-500 ml-1 text-sm">{timeAgo()}</footer>
          </article>

          {/* User 3 */}
          <article className="border-2 p-5 rounded-xl shadow-lg ">
            <header className="flex w-[60px] mb-10 ">
              <img className="rounded-full" src={assets.maharashtra} alt="User Profile" />
              <p className="ml-4 font-bold">userName</p>
            </header>
            <p className="ml-5 mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
            <footer className="text-gray-500 ml-1 text-sm">{timeAgo()}</footer>
          </article>

          {/* User 4 */}
          <article className="border-2 p-5 rounded-xl shadow-lg ">
            <header className="flex w-[60px] mb-10 ">
              <img className="rounded-full" src={assets.maharashtra} alt="User Profile" />
              <p className="ml-4 font-bold">userName</p>
            </header>
            <p className="ml-5 mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
            <footer className="text-gray-500 ml-1 text-sm">{timeAgo()}</footer>
          </article>
        </div>
      </div>
    </section>
  );
}

export default Stories;
