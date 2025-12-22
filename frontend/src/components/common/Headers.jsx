import React, { useState } from "react";
import { Heart, MessageCircle, User, MountainSnow, X, Eye, EyeOff, Bell } from "lucide-react";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

// --- Header Component ---
// This component displays the top navigation bar
const AppHeader = ({ onLoginClick }) => {
  return (
    <div className="flex flex-1 items-center justify-between border-b border-gray-200 px-4 py-4 md:px-6">
      {/* Logo/Title */}
      <div className="flex items-center  justify-center gap-2">
        <img src={assets.sw_logo} className="size-10 text-blue-600" />
        <h4 className="font-bold text-lg">Scenic Wonders</h4>
      </div>

      {/* Icons & Login Button */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Favorite Icon */}
        <button aria-label="Favorites" className="text-gray-600 hover:text-gray-900 transition-colors">
          <Heart className="size-6" />
        </button>

        {/* Sign In Button */}
        <button
          onClick={onLoginClick}
          className="ml-2 flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-100 hover:shadow-sm"
        >
          <User className="size-5" />
          <span>Sign In</span>
        </button>
      </div>
    </div>
  );
};

// --- Login Modal Component ---
//  The pop-up modal for logging in
const LoginModal = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [currentState, setCurrentState] = useState("Login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  };

  return (
    // Modal Overlay (dimmed background)
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
          {currentState === "Login" ? (
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

          {/* Forgot Password Link & login or sing up */}
          <div className="w-full flex justify-between text-sm ">
            {currentState === "Sing Up" ? null : (
              <p className="cursor-pointer hover:text-blue-800">Forgot your password?</p>
            )}

            {currentState === "Sing Up" ? (
              <p onClick={() => setCurrentState("Login")} className="cursor-pointer hover:text-blue-800">
                Login here
              </p>
            ) : (
              <p onClick={() => setCurrentState("Sing Up")} className="cursor-pointer hover:text-blue-800">
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
              {currentState === "Login" ? "Sing In" : "Sing up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Main App Component ---
// This is the main component that brings everything together
export default function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="font-sans">
      {/* We pass the function to open the modal to the header */}
      <AppHeader onLoginClick={() => setShowLoginModal(true)} />

      {/* Conditionally render the login modal */}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </div>
  );
}
