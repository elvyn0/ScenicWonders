import React, { useState } from "react";

function StoriesPost() {
  const [Headline, setHeadline] = useState("");
  const [writeUps, setWriteUps] = useState("");

  const handileSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handileSubmit} className="p-5 ">
      <h3 className="font-bold"> Stories</h3>
      <div className="flex  justify-center items-center mt-5 ">
        <div className="flex flex-col gap-5 bg-gray-300 w-[50%] p-5 rounded-lg shadow-xl ">
          <div>
            <p className="text-sm">Headline </p>
            <input
              onChange={(e) => setHeadline(e.target.value)}
              type="text"
              className="py-3   pl-2 rounded-md w-full"
              placeholder="Headline"
              value={Headline}
              required
            />
          </div>
          <div className=" flex flex-col justify-center">
            <p className="text-sm">Write Ups</p>
            <textarea
              onChange={(e) => setWriteUps(e.target.value)}
              value={writeUps}
              type="text"
              className="w-full pb-5 pt-1 pl-2 rounded-lg"
              placeholder="Share your stories here..."
              required
            />
          </div>
          <div className="flex justify-end ">
            <button
              className=" border-2 border-white border-solid font-bold  py-3 px-4 rounded-full hover:bg-gray-500 hover:text-white transition-all shadow-md"
              type="submit"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default StoriesPost;
