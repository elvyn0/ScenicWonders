import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddHotel from "./pages/AddHotel";
import HotelsList from "./pages/HotelsList";
import BookingsList from "./pages/BookingsList";
import Headers from "./components/Headers";

function App() {
  return (
    <div className="bg-gray-100">
      <Toaster />
      <Headers />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addhotel" element={<AddHotel />} />
        <Route path="/hotelsList" element={<HotelsList />} />
        <Route path="/bookingsList" element={<BookingsList />} />
      </Routes>
    </div>
  );
}

export default App;
