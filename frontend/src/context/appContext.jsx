import { createContext, useState } from "react";
import { hotels } from "../assets/assets";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(useState(localStorage.getItem("token")));
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };
  const currency = "₹";
  const taxes = 600;

  const value = {
    api,
    token,
    setToken,
    navigate,
    showLogin,
    setShowLogin,
    handleLogout,
    hotels,
    currency,
    taxes,
    search,
    setSearch,
    showSearch,
    setShowSearch,
  };
  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
