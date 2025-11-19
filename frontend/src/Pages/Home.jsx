import Footer from "../Components/Footer";
import Headers from "../Components/Headers";
import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";

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
