import { Telescope, Bot, NotebookPen, Hotel, BadgeInfo } from "lucide-react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div className="bg-gray-200 py-5 px-8 rounded-lg mt-5 mx-5 items-center  ">
      <div className="flex flex-col gap-5">
        {/*  Heading */}
        <div>
          <h1 className="text-4xl  font-bold text-black text-center">
            TRAVELERES ARE DREAMERS WHO MAKE THEIR DESIRES FOR ADVENTURE A REALITY.
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
              <p className=" font-bold  text-sm">Explore</p>
            </div>
            {/* Blog Nav */}
            <div className="flex flex-col gap-2 justify-center items-center">
              <li
                className="   bg-red-600   px-4 py-3 rounded-md shadow-lg hover:scale-110 transition ease-in-out hover:shadow-xl "
                type="button"
              >
                <NotebookPen className="size-7 text-white" />
              </li>
              <p className="font-bold text-sm">Write up's</p>
            </div>
            {/* Hotels Nav */}
            <div className="flex flex-col gap-2 justify-center items-center">
              <li
                className=" bg-red-600   px-4 py-3 rounded-lg shadow-lg hover:scale-110 transition ease-in-out hover:shadow-xl "
                type="button"
              >
                <Hotel className="size-7 text-white" />
              </li>
              <p className="font-bold text-sm">Hotels</p>
            </div>
            {/* Ai Nav */}
            <div className="flex flex-col gap-2 justify-center items-center">
              <li
                className="  bg-red-600  px-4 py-3 rounded-lg shadow-lg hover:scale-110 transition ease-in-out hover:shadow-xl "
                type="button"
              >
                <Bot className="size-7 text-white" />
              </li>
              <p className="font-bold text-sm">Ai</p>
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
              <p className="font-bold text-sm">About</p>
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
