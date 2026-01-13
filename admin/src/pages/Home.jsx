import StatusBanner from "../components/StatusBanner";
import Nav from "../components/Nav";

function Home() {
  return (
    <div className=" flex flex-col gap-10 h-screen">
      <StatusBanner />
      <Nav />
    </div>
  );
}

export default Home;
