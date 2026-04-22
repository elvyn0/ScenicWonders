import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddHotel from "./pages/AddHotel";
import HotelsList from "./pages/HotelsList";
import BookingsList from "./pages/BookingsList";
import Headers from "./components/Headers";
import Login from "./components/Login";
import { useState } from "react";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");

  return (
    <div className="bg-gray-100 min-h-screen">
      <Toaster />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Headers setToken={setToken} />{" "}
          <Routes>
            <Route path="/" element={<Home />} /> <Route path="/addhotel" element={<AddHotel />} />
            <Route path="/hotelslist" element={<HotelsList />} />
            <Route path="/bookingsList" element={<BookingsList />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
