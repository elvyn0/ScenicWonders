import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { AppContext } from "./AppContext";
import toast from "react-hot-toast";

/// Socket-io ///
const socket = io(import.meta.env.VITE_BACKEND_URL, {
  withCredentials: true,
});

const AppContextProvider = (props) => {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  //  for Payment
  const currency = "₹";
  const taxes = 600;

  /// Backend  ///
  const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
  });

  /// To get the user ///
  const fetchUser = async () => {
    try {
      const response = await api.get("/api/user/me");
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  /// Logout ///
  const handleLogout = async () => {
    try {
      const response = await api.post("/api/user/logout");
      if (response.data.success) {
        localStorage.removeItem("user");
        setUser(null);
        window.location.href = "/";
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const value = {
    api,
    socket,
    setUser,
    user,
    authLoading,
    navigate,
    showLogin,
    setShowLogin,
    handleLogout,
    currency,
    taxes,
  };
  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
