import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { AppContext } from "./AppContext";

const AppContextProvider = (props) => {
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  //  for Payment
  const currency = "₹";
  const taxes = 600;

  /// Backend  ///
  const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
  });

  /// Socket-io ///
  const socket = io(import.meta.env.VITE_BACKEND_URL, {
    transports: ["websocket"],
    withCredentials: true,
    auth: { token },
  });

  /// To get the user ///
  const fetchUser = async () => {
    try {
      const response = await api.get("/api/user/me", { headers: { token } });
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) fetchUser();
  }, [token]);

  /// Logout ///
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    window.location.href = "/";
  };

  const value = {
    api,
    token,
    socket,
    setToken,
    setUser,
    user,
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
