import assets from "../assets/assets";
import Footer from "../components/common/Footer";

function About() {
  return (
    <div className="flex flex-col pt-5 gap-20">
      <div className="flex  gap-2 items-center justify-center ">
        <img src={assets.sw_logo} className="size-20" />
        <h3 className="font-bold">Scenic Wonders</h3>
      </div>
      <section className="mt-10 flex flex-col gap-3 px-4">
        <h3 className="font-extrabold text-red-600 text-5xl mb-5">About Scenic wonders:</h3>

        <div>
          <h4 className="font-bold">Travel isn’tjust about places — it’s about stories.</h4>
          <p>
            Scenic Wonders was built for travelers who crave more than postcards and check-ins. It’s a space where
            journeys come alive — where people share real experiences, hidden gems, and moments that don’t make it to
            mainstream travel guides.
          </p>
        </div>
        <div>
          <h4 className="font-bold">Our Vision</h4>
          <p>
            To connect the world through authentic travel stories and simplify every part of the journey — from
            discovering new destinations to booking stays, exploring food, and finding what truly matters in a new
            place. We believe travel should feel human, not algorithmic — powered by real people, not generic reviews.
          </p>
        </div>
        <div>
          <h4 className="font-bold">What Scenic Wonders Does</h4>
          <p>We brings everything a traveler needs into one place:</p>
          <ul className="list-disc  ml-2">
            <li>
              ✈️ <b>Explore real experiences</b> from travelers worldwide — photos, blogs, tips, and itineraries.
            </li>
            <li>
              🏨 <b className="font-bold">Find and book</b> trusted hotels and stays in your destination.
            </li>
            <li>
              🍜 <b className="font-bold">Discover local favorites — </b>top food spots, cafes, and hidden restaurants
              locals actually love.
            </li>
            <li>
              🚆<b className="font-bold"> Check travel conditions — </b>live weather, train info, and travel updates for
              your next stop.
            </li>
            <li>
              💬 <b className="font-bold">Share your story —</b> upload your photos, write your travel blogs, inspire
              others to explore.
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold">Why it matters</h4>
          <p>
            Because the best travel plans aren’t built by search engines — they’re built by people who’ve been there.
            Scenic Wonders helps travelers cut through noise, trust real experiences, and make every journey personal,
            smarter, and unforgettable.
          </p>
        </div>
        <div>
          <h4 className="font-bold">Join the movement</h4>
          <p>
            We’re redefining how people explore the world — one story at a time. Whether you’re planning your first trip
            or sharing your hundredth, Scenic wonders is your space to connect, discover, and inspire others to see the
            world differently.
          </p>
        </div>
      </section>
      <div className="flex flex-wrap justify-center gap-4 mx-2 ">
        <div className="bg-gray-200 flex flex-col  justify-center py-4 px-16 rounded-3xl shadow-md">
          <p className="font-bold text-3xl">200 milion</p>
          <p className="text-2xl text-gray-600">monthly active users</p>
        </div>
        <div className="bg-gray-200 flex flex-col  justify-center py-4 px-16 rounded-3xl shadow-md">
          <p className="font-bold text-3xl">50 milion</p>
          <p className="text-2xl text-gray-600">new post every month</p>
        </div>
      </div>
      <div className="mt-10 text-center">
        <p className="font-bold text-3xl mb-3">Get in touch:</p>
        <p className="text-gray-700 mb-5">
          Have questions or ideas? Get in touch with us — we’d love to hear from you.
        </p>
        <p className="bg-black text-white  rounded-full py-3 px-4 font-medium inline-block">scenicwonders@gmail.com</p>
      </div>
      <Footer />
    </div>
  );
}

export default About;
