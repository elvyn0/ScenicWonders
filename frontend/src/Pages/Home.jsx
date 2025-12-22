import Footer from "../components/common/Footer";
import Headers from "../components/common/Headers";
import Hero from "../components/common/Hero";
import Navbar from "../components/common/Navbar";

function Home() {
  return (
    <div className="flex flex-col flex-1 ml-[4%]">
      <Headers />
      <Hero />
      <Navbar />
      <Footer />
    </div>
  );
}

export default Home;
