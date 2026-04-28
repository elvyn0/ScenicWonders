import { Telescope, Bot, NotebookPen, Hotel, BadgeInfo } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import AiBot from "./Ai/AiBot";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useState } from "react";
import { toast } from "react-hot-toast";

function NavBar() {
  // function   for  Ai chat bot //
  const { api } = useContext(AppContext);
  const [aiOpen, setAiOpen] = useState(false);
  const [message, setMessage] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sending message function
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };

    setMessage((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      setLoading(true);
      setError(null);

      const response = await api.post("/api/ai/chat", { message: input });
      if (response.data.success) {
        const botMessage = { role: "bot", text: response.data.reply };
        setMessage((prev) => [...prev, botMessage]);
        setError(null);
      } else {
        toast.error(response.data.message);
        setError("Failed to load data");
      }
    } catch (error) {
      console.error(error);
      setMessage((prev) => [...prev, { role: "bot", text: "Something went wrong" }]);
      toast.error(error.response?.data?.message);
      setError("Server not responding...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 pt-4 mb-5">
      <div className="flex flex-col gap-5">
        {/* Tabs */}
        <nav className="px-2">
          <ul className="grid grid-cols-3 sm:grid-cols-5 gap-4 place-items-center">
            {/* Explore */}
            <div className="flex flex-col items-center gap-1">
              <NavLink to="/explore">
                <li className="bg-red-600 p-2 md:px-3 md:py-2 rounded-lg shadow hover:scale-105 transition">
                  <Telescope className="size-5 md:size-6 text-white" />
                </li>
              </NavLink>
              <p className="text-xs md:text-sm font-bold">Explore</p>
            </div>

            {/* Stories */}
            <div className="flex flex-col items-center gap-1">
              <NavLink to="/stories">
                <li className="bg-red-600 p-2 md:px-3 md:py-2 rounded-lg shadow hover:scale-105 transition">
                  <NotebookPen className="size-5 md:size-6 text-white" />
                </li>
              </NavLink>
              <p className="text-xs md:text-sm font-bold">Stories</p>
            </div>

            {/* Hotels */}
            <Link to="/hotels-bookings" target="_blank" className="no-underline">
              <div className="flex flex-col items-center gap-1 text-center">
                <li className="bg-red-600 p-2 md:px-3 md:py-2 rounded-lg shadow hover:scale-105 transition">
                  <Hotel className="size-5 md:size-6 text-white" />
                </li>
                <p className="text-xs md:text-sm font-bold leading-tight text-black">Hotels</p>
              </div>
            </Link>

            {/* AI */}
            <div className="flex flex-col items-center gap-1">
              <li
                onClick={() => setAiOpen(true)}
                className="bg-blue-500 p-2 md:px-3 md:py-2 rounded-lg shadow hover:scale-105 transition cursor-pointer"
              >
                <Bot className="size-5 md:size-6 text-white" />
              </li>

              <AiBot
                aiOpen={aiOpen}
                setAiOpen={setAiOpen}
                sendMessage={sendMessage}
                input={input}
                setInput={setInput}
                message={message}
                loading={loading}
                error={error}
              />

              <p className="text-xs md:text-sm font-bold">AI</p>
            </div>

            {/* About */}
            <div className="flex flex-col items-center gap-1">
              <NavLink to="/about">
                <li className="bg-red-600 p-2 md:px-3 md:py-2 rounded-lg shadow hover:scale-105 transition">
                  <BadgeInfo className="size-5 md:size-6 text-white" />
                </li>
              </NavLink>
              <p className="text-xs md:text-sm font-bold">About</p>
            </div>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;
