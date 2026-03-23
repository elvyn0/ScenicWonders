import React, { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login({ setToken }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      const response = await api.post("/api/user/admin/login", {
        email,
        password,
      });

      if (response.data.success) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setToken(token);

        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went worng");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gradient-to-tr from-gray-950 via-gray-500 to-white from-5%">
      <div>
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
        </div>
        <form onSubmit={submitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-200 mb-2">Email Address</p>
            <input
              className="rounded-sm w-full px-3 py-3 border border-gray-300  text-gray-300 outline-none "
              type="email"
              placeholder="your@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-200 mb-2">Password</p>
            <input
              className="rounded-sm w-full px-3 py-3 border border-gray-300  text-gray-300 outline-none"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="mt-2 w-full py-2 px-4 rounded-sm text-white bg-black">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
