import Footer from "../components/common/Footer";
import Headers from "../components/common/Headers";
import Hero from "../components/common/Hero";
import Navbar from "../components/common/Navbar";
import WeekendDeals from "../components/hotels/WeekendDeals";
import Login from "../components/common/Login";
import { useContext } from "react";
import { AppContext } from "../context/appContext";

function Home() {
  const { showLogin, setShowLogin, handleLogout } = useContext(AppContext);
  return (
    <div className="flex flex-col flex-1 ml-[4%]">
      <Headers onLoginClick={() => setShowLogin(true)} onLogout={handleLogout} />
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
      <Hero />
      <Navbar />
      <WeekendDeals />
      <Footer />
    </div>
  );
}

export default Home;
