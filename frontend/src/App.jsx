import { ToastContainer } from "react-toastify";
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
import SideBar from "./Components/SideBar";
import Post from "./Components/Post";
import StoriesPost from "./Components/StoriesPost";
import Profile from "./Pages/Profile";
import Stories from "./Pages/Stories";
import Message from "./Pages/Message";
import About from "./Pages/About";
import Hotels from "./Pages/Hotels";

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
      <ToastContainer />
      <Routes>
        <Route path="/hotels" element={<Hotels />} />
        <Route element={<LayoutWithSidebar />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/nepal" element={<Nepal />} />
          <Route path="/kerala" element={<Kerala />} />
          <Route path="/tamilnadu" element={<TamilNadu />} />
          <Route path="/maharashtra" element={<Maharashtra />} />
          <Route path="/punjab" element={<Punjab />} />
          <Route path="/rajasthan" element={<Rajasthan />} />
          <Route path="/post" element={<Post />} />
          <Route path="/storiesPost" element={<StoriesPost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/message" element={<Message />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
