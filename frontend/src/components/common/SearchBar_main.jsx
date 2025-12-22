import { Search } from "lucide-react";

function SearchBar_main() {
  return (
    <div className="fixed left-5  top-0 w-full px-32 bg-white pb-5 pt-3 z-10 ">
      <form className="  bg-gray-100 hover:bg-gray-200  shadow flex items-center border-2   rounded-full w-full">
        <label htmlFor="search"></label>
        <input
          type="text"
          placeholder="search"
          className="border-none rounded-full py-2  bg-gray-100 hover:bg-gray-200 px-5 w-full"
        />
        <button className=" text-white rounded px-3 py-1 ">
          <Search className="size-10 rounded-full p-2 hover:bg-gray-300  text-black" />
        </button>
      </form>
    </div>
  );
}

export default SearchBar_main;
