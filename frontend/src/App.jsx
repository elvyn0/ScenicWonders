import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./Pages/Home";
import Explore from "./Pages/Explore";
import Nepal from "./Pages/Nepal";
import Kerala from "./Pages/Kerala";
import TamilNadu from "./Pages/TamilNadu";
import Maharashtra from "./Pages/Maharashtra";
import Punjab from "./Pages/Punjab";
import Rajasthan from "./Pages/Rajasthan";
import SideBar from "./components/common/SideBar";
import Post from "./components/PostFolder/Post";
import StoriesPost from "./components/StoryFolder/StoriesPost";
import Profile from "./Pages/Profile";
import Stories from "./Pages/Stories";
import About from "./Pages/About";
import Hotel from "./Pages/Hotel";
import Booknow from "./Pages/Booknow";
import Message from "./Pages/Message";
import MessageRoom from "./components/common/Message/MessageRoom";
import MyBookings from "./Pages/MyBookings";
import HotelsAndBookingbar from "./Pages/HotelsAndBooingbar";
import BookingSuccess from "./Pages/BookingSuccess";
import BookingCancel from "./Pages/BookingCancel";
import StoryById from "./Pages/StoryById";
import PostById from "./Pages/PostById";
import NotFound from "./Pages/NotFound";

// Layout with sibeBar
const LayoutWithSidebar = () => {
  return (
    <div className=" flex">
      {/* sidebar */}
      <div className="md:w-16 ">
        <SideBar />
      </div>
      {/* main content */}
      <div className="flex-1 pb-16 md:pb-0">
        {/* */}
        <Outlet />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Toaster />

      <Routes>
        <Route element={<LayoutWithSidebar />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/post" element={<Post />} />
          <Route path="/hotels&bookings" element={<HotelsAndBookingbar />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/message" element={<Message />} />
          <Route path="/message/:conversationId" element={<MessageRoom />} />
          <Route path="/storiesPost" element={<StoriesPost />} />
          <Route path="/nepal" element={<Nepal />} />
          <Route path="/kerala" element={<Kerala />} />
          <Route path="/tamilNadu" element={<TamilNadu />} />
          <Route path="/maharashtra" element={<Maharashtra />} />
          <Route path="/rajasthan" element={<Rajasthan />} />
          <Route path="/punjab" element={<Punjab />} />
          <Route path="/myBookings" element={<MyBookings />} />
          <Route path="/story/:id" element={<StoryById />} />
          <Route path="/post/:id" element={<PostById />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/hotels/hotel/:hotelId" element={<Hotel />} />
        <Route path="/booknow/:hotelId" element={<Booknow />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/booking-cancel" element={<BookingCancel />} />
      </Routes>
    </div>
  );
};

export default App;
