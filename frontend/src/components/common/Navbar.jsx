import { Telescope, Bot, NotebookPen, Hotel, BadgeInfo } from "lucide-react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div className="bg-gray-200 py-4 px-8 rounded-lg mt-5 mx-5 items-center  ">
      <div className="flex flex-col gap-5">
        {/*  Heading */}

        <div className="text-center w-full mx-auto p-2 bg-white rounded-xl shadow-md mt-2">
          <h1 className=" text-lg font-semibold  ">
            Scenic Wonders is a social platform for travelers to share real travel experiences through blogs, explore
            destinations, and discover places to stay.
          </h1>
        </div>

        {/* Tabs */}
        <nav className=" px-5 ">
          <ul className="flex flex-row  justify-between items-center mx-5">
            {/* Explore Nav */}
            <div className=" flex flex-col gap-2 justify-center items-center">
              <NavLink to="/explore">
                <li
                  className="   bg-red-600   px-4 py-3 rounded-lg shadow-lg hover:scale-110 transition ease-in-out hover:shadow-xl "
                  type="button"
                >
                  <Telescope className="size-7 text-white" />
                </li>
              </NavLink>
              <p className=" font-bold  text-sm mb-0">Explore</p>
              <span className="text-sm text-gray-500">Discover places, stories, and posts</span>
            </div>
            {/* Blog Nav */}
            <div className="flex flex-col gap-2 justify-center items-center">
              <NavLink to="/stories">
                <li
                  className="   bg-red-600   px-4 py-3 rounded-md shadow-lg hover:scale-110 transition ease-in-out hover:shadow-xl "
                  type="button"
                >
                  <NotebookPen className="size-7 text-white" />
                </li>
              </NavLink>
              <p className="font-bold text-sm mb-0">Stories</p>
              <span className="text-sm text-gray-500">Share travel stories</span>
            </div>
            {/* Hotels Nav */}
            <a href="/hotels&bookings" target="_blank" rel="noopener noreferrer" className="no-underline">
              <div className="flex flex-col gap-2 justify-center items-center">
                <li
                  className=" bg-red-600   px-4 py-3 rounded-lg shadow-lg hover:scale-110 transition ease-in-out hover:shadow-xl "
                  type="button"
                >
                  <Hotel className="size-7 text-white" />
                </li>
                <p className="font-bold text-sm text-black  mb-0">Hotels</p>
                <span className="text-sm text-gray-500 ">Find places to stay</span>
              </div>
            </a>
            {/* Ai Nav */}
            <div className="flex flex-col gap-2 justify-center items-center">
              <li
                className="  bg-red-600  px-4 py-3 rounded-lg shadow-lg hover:scale-110 transition ease-in-out hover:shadow-xl "
                type="button"
              >
                <Bot className="size-7 text-white" />
              </li>
              <p className="font-bold text-sm mb-0">Ai</p>
              <span className="text-sm text-gray-500">Smart travel help</span>
            </div>
            {/* About */}
            <div className="flex flex-col gap-2 justify-center items-center">
              <NavLink to="/about">
                <li
                  className="  bg-red-600  px-4 py-3 rounded-lg shadow-lg hover:scale-110 transition ease-in-out hover:shadow-xl "
                  type="button"
                >
                  <BadgeInfo className="size-7 text-white" />
                </li>
              </NavLink>
              <p className="font-bold text-sm mb-0">About</p>
              <span className="text-sm text-gray-500">Our story</span>
            </div>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;

{
  /*
  // Search Bar Component :
        <form className="bg-white p-2 rounded-lg shadow mt-12 flex  items-center  w-[1000px] ">
          <input type="text" placeholder="Search hear" className=" border-none rounded px-3  w-full" />
          <button className="bg-orange-500 text-white px-6 py-2 rounded-xl">
            <SearchIcon className="size-6" />
          </button>
        </form>
  */
}
