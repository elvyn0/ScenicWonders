import { X, Eye, EyeOff } from "lucide-react";
import { useContext, useState } from "react";
import assets from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function Login({ onClose }) {
  const { api, navigate, setUser } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const [currentState, setCurrentState] = useState("singUp");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Submit handler
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // User register
    try {
      if (currentState === "singUp") {
        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        if (!trimmedName || !trimmedEmail || !trimmedPassword) {
          return toast.error("All fields are required");
        }

        const response = await api.post("/api/user/register", {
          name: trimmedName,
          email: trimmedEmail,
          password: trimmedPassword,
        });

        if (response.data.success) {
          setUser(response.data.userData);
          localStorage.setItem("user", JSON.stringify(response.data.userData));
          toast.success("Welcome to Scenic Wonders");

          onClose();
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } else {
        // User login
        const response = await api.post("/api/user/login", { email, password });
        if (response.data.success) {
          setUser(response.data.userData);
          localStorage.setItem("user", JSON.stringify(response.data.userData));
          toast.success("Logged in successfully");

          onClose();
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    //  Overlay (dimmed background)
    <div
      onClick={onClose} // Close modal when clicking the background
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
    >
      {/* Modal Content (the white box) */}
      <div
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
        className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        >
          <X className="size-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col items-center">
          <img className="size-16 mb-4" src={assets.sw_logo} />
          <h1 className="mb-6 text-center text-sm font-bold text-gray-900">Welcome to Scenic Wonders</h1>
        </div>

        {/* Login Form */}
        <form className="space-y-5" onSubmit={onSubmitHandler}>
          {currentState === "login" ? (
            ""
          ) : (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                className="w-full rounded-lg border-gray-300 p-3 text-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Name"
                required
              />
            </div>
          )}

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              value={email}
              placeholder="Email"
              type="email"
              required
              className="w-full rounded-lg border-gray-300 p-3 text-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                value={password}
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                required
                className="w-full rounded-lg border-gray-300 p-3 text-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {/* Show/Hide Password Toggle */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>
          </div>

          {/* Forgot Password Link & login or singup */}
          <div className="w-full flex justify-between text-sm ">
            {currentState === "singUp" ? null : (
              <p className="cursor-pointer hover:text-blue-800">Forgot your password?</p>
            )}

            {currentState === "singUp" ? (
              <p onClick={() => setCurrentState("login")} className="cursor-pointer hover:text-blue-800">
                Login here
              </p>
            ) : (
              <p onClick={() => setCurrentState("singUp")} className="cursor-pointer hover:text-blue-800">
                Create account
              </p>
            )}
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full rounded-full bg-red-600 py-3 text-md font-semibold text-white transition-colors hover:bg-red-700"
            >
              {currentState === "login" ? "Login" : "singup"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
