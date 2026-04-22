import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <h1 className="mb-0 text-red-600 font-bold text-6xl ">Oop!</h1>
      <img src={assets.Error_404} className="w-full max-w-200" />
      <button onClick={() => navigate("/")} className="mt-5 bg-purple-800 text-white font-bold rounded-full py-3 px-5">
        Go Home
      </button>
    </div>
  );
}

export default ErrorPage;
