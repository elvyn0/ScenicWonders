import StatusBanner from "../components/StatusBanner";
import Nav from "../components/Nav";

function Home({ token }) {
  return (
    <div className=" flex flex-col gap-10 h-screen">
      <StatusBanner token={token} />
      <Nav />
    </div>
  );
}

export default Home;
