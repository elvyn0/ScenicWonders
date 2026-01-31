import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddHotel from "./pages/AddHotel";
import HotelsList from "./pages/HotelsList";
import BookingsList from "./pages/BookingsList";
import Headers from "./components/Headers";
import Login from "./components/Login";
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Toaster />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Headers setToken={setToken} />

          <Routes>
            <Route path="/" element={<Home token={token} />} />
            <Route path="/addhotel" element={<AddHotel token={token} />} />
            <Route path="/hotelslist" element={<HotelsList token={token} />} />
            <Route path="/bookingsList" element={<BookingsList token={token} />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
