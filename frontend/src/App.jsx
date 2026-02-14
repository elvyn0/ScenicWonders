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
import Post from "./components/Post";
import StoriesPost from "./components/StoriesPost";
import Profile from "./Pages/Profile";
import Stories from "./Pages/Stories";
import Message from "./Pages/Message";
import About from "./Pages/About";
import Hotel from "./Pages/Hotel";
import Booknow from "./Pages/Booknow";
import HotelsLists from "./Pages/HotelsLists";

// Layout with sibeBar
const LayoutWithSidebar = () => {
  return (
    <div className="relative z-[100] flex">
      <SideBar />
      <div className="flex-1">
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
          <Route path="/hotelsLists" element={<HotelsLists />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/message" element={<Message />} />
          <Route path="/storiesPost" element={<StoriesPost />} />
          <Route path="/nepal" element={<Nepal />} />
          <Route path="/kerala" element={<Kerala />} />
          <Route path="/tamilNadu" element={<TamilNadu />} />
          <Route path="/maharashtra" element={<Maharashtra />} />
          <Route path="/rajasthan" element={<Rajasthan />} />
          <Route path="/punjab" element={<Punjab />} />
        </Route>
        <Route path="/hotels/hotel/:hotelId" element={<Hotel />} />
        <Route path="/booknow/:hotelId" element={<Booknow />} />
      </Routes>
    </div>
  );
};

export default App;
