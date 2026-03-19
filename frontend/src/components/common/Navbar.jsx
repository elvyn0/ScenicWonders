import { Telescope, Bot, NotebookPen, Hotel, BadgeInfo } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import AiBot from "./AiBot";
import { useContext } from "react";
import { AppContext } from "../../context/appContext";
import { useState } from "react";
import { toast } from "react-hot-toast";

function NavBar() {
  // function   for  Ai chat bot //
  const { api } = useContext(AppContext);
  const [aiOpen, setAiOpen] = useState(false);
  const [message, setMessage] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };

    setMessage((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await api.post("/api/ai/chat", { message: input });
      if (response.data.success) {
        const botMessage = { role: "bot", text: response.data.reply };
        setMessage((prev) => [...prev, botMessage]);
        console.log(botMessage);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setMessage((prev) => [...prev, { role: "bot", text: "Something went wrong" }]);

      toast.error(error.response?.data?.message);
    }
    setLoading(false);
  };

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
                  className="   bg-red-600   px-3 py-2 rounded-lg shadow-lg hover:scale-110 transition ease-in-out hover:shadow-xl "
                  type="button"
                >
                  <Telescope className="size-6 text-white" />
                </li>
              </NavLink>
              <p className=" font-bold  text-sm mb-0">Explore</p>
            </div>
            {/* Blog Nav */}
            <div className="flex flex-col gap-2 justify-center items-center">
              <NavLink to="/stories">
                <li
                  className="   bg-red-600   px-3 py-2 rounded-md shadow-lg hover:scale-110 transition ease-in-out hover:shadow-xl "
                  type="button"
                >
                  <NotebookPen className="size-6 text-white" />
                </li>
              </NavLink>
              <p className="font-bold text-sm mb-0">Stories</p>
            </div>
            {/* Hotels Nav */}
            <Link to="/hotels&bookings" target="_blank" rel="noopener noreferrer" className="no-underline">
              <div className="flex flex-col gap-2 justify-center items-center">
                <li
                  className=" bg-red-600   px-3 py-2 rounded-lg shadow-lg hover:scale-110 transition ease-in-out hover:shadow-xl "
                  type="button"
                >
                  <Hotel className="size-6 text-white" />
                </li>
                <p className="font-bold text-sm text-black  mb-0"> Book your hotels</p>
              </div>
            </Link>
            {/* Ai Nav */}
            <div className="flex flex-col gap-2 justify-center items-center">
              <li
                onClick={() => setAiOpen(true)}
                className="  bg-blue-500  px-3 py-2 rounded-lg shadow-lg hover:scale-110 transition ease-in-out hover:shadow-xl "
                type="button"
              >
                <Bot className="size-6 text-white" />
              </li>
              <AiBot
                aiOpen={aiOpen}
                setAiOpen={setAiOpen}
                sendMessage={sendMessage}
                input={input}
                setInput={setInput}
                message={message}
                loading={loading}
              />
              <p className="font-bold text-sm mb-0">Ai</p>
            </div>
            {/* About */}
            <div className="flex flex-col gap-2 justify-center items-center">
              <NavLink to="/about">
                <li
                  className="  bg-red-600  px-3 py-2 rounded-lg shadow-lg hover:scale-110 transition ease-in-out hover:shadow-xl "
                  type="button"
                >
                  <BadgeInfo className="size-6 text-white" />
                </li>
              </NavLink>
              <p className="font-bold text-sm mb-0">About</p>
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
