import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { io } from "socket.io-client";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  /// Backend  ///

  const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
  });

  /// Socket-io ///

  const socket = io("http://localhost:4000");
  socket.on("connect", () => {
    console.log("Connected with ID:", socket.id);
  });

  /// To get the user ///

  const fetchUser = async () => {
    try {
      const response = await api.get("/api/user/me", { headers: { token } });
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.log(error);
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
  };
  const currency = "₹";
  const taxes = 600;

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
