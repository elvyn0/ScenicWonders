import { createContext, useState } from "react";
import { hotels } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const currency = "₹";
  const taxes = 600;

  const value = {
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
