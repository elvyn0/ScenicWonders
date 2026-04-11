import { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

function NotFound() {
  // Error page
  const { navigate } = useContext(AppContext);
  return (
    <div className="flex flex-col items-center justify-center p-5">
      <h1 className="mb-0 text-red-600 font-bold text-6xl ">Oop!</h1>
      <img src={assets.Error_404} className="w-full max-w-[800px]" />
      <button onClick={() => navigate("/")} className="mt-5 bg-purple-800 text-white font-bold rounded-full py-3 px-5">
        Go Home
      </button>
    </div>
  );
}

export default NotFound;
