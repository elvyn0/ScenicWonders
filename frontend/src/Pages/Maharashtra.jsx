import { assets } from "../assets/assets";

function Maharashtra() {
  return (
    <div>
      {/* Banner */}
      <div className="flex flex-col gap-5 items-center mt-6 px-4 md:px-[6%]">
        <div className="bg-violet-100 rounded-full shadow-xl w-full text-center px-4">
          <h1 className="py-2 font-bold text-2xl md:text-[40px]">Maharashtra</h1>
        </div>

        <img className="w-full max-w-lg h-48 md:h-[300px] object-cover rounded-3xl" src={assets.maharashtraMumbai1} />

        <p className="w-full md:w-[60%] text-center md:text-left text-gray-600">
          Maharashtra is a vast state with a wide range of attractions, from bustling cities and ancient caves to
          tranquil hill stations and stunning coastal stretches.
        </p>

        <hr className="w-full md:w-[80%] border-violet-200 border-2" />
      </div>

      {/* Content */}
      <div className="py-10 px-4 md:px-12 flex flex-col gap-10">
        {/* Mumbai */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <img className="w-full md:w-1/2 rounded-lg" src={assets.maharashtraMumbai} />
          <div className="bg-violet-100 py-6 px-4 text-center w-full md:w-1/2 rounded-md shadow-xl">
            <p>
              <span className="font-bold">Mumbai:</span> As the financial and entertainment capital of India, Mumbai is
              a city of dreams and contrasts. It's a city that never sleeps, with a vibrant energy that's infectious.
              Must-visit places include the iconic Gateway of India, the beautiful Marine Drive (also known as the
              "Queen's Necklace"), the historical Chhatrapati Shivaji Maharaj Terminus, and the bustling Colaba
              Causeway. You can also take a ferry to the ancient Elephanta Caves, a UNESCO World Heritage site with
              stunning rock-cut sculptures.
            </p>
          </div>
        </div>

        {/* Ajanta & Ellora */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="bg-violet-100 py-6 px-4 text-center w-full md:w-1/2 rounded-md shadow-xl">
            <p>
              <span className="font-bold">Ajanta & Ellora Caves:</span> Located near Aurangabad, these two UNESCO World
              Heritage sites are a testament to ancient Indian art and spirituality. The Ajanta Caves are a complex of
              rock-cut Buddhist cave monuments dating from the 2nd century BCE to about 480 CE, famous for their
              beautiful mural paintings. The Ellora Caves showcase a unique blend of Buddhist, Hindu, and Jain art, with
              magnificent rock-cut temples and monasteries carved out of a single cliff.
            </p>
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <img className="rounded-3xl" src={assets.maharashtraAjantaAndElloraCaves} />
            <img className="rounded-3xl" src={assets.maharashtraAjantaAndElloraCaves1} />
            <img className="rounded-3xl" src={assets.maharashtraAjantaAndElloraCaves2} />
          </div>
        </div>

        {/* Lonavala */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <img className="rounded-3xl" src={assets.maharashtraKhandala} />
            <img className="rounded-3xl" src={assets.maharashtraLonavala1} />
          </div>

          <div className="bg-violet-100 py-6 px-4 text-center w-full md:w-1/2 rounded-md shadow-xl">
            <p>
              <span className="font-bold">Lonavala & Khandala:</span> These twin hill stations are a popular escape from
              the heat and hustle of Mumbai and Pune. Located in the Sahyadri mountains, they offer lush green
              landscapes, cascading waterfalls (especially during the monsoon), and a pleasant climate. Travelers can
              enjoy scenic viewpoints like Tiger's Point and Duke's Nose, visit the serene Lonavala Lake, and explore
              the ancient Karla and Bhaja Caves.
            </p>
          </div>
        </div>

        {/* Tadoba */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="bg-violet-100 py-6 px-4 text-center w-full md:w-1/2 rounded-md shadow-xl">
            <p>
              <span className="font-bold">Tadoba Andhari Tiger Reserve: </span> For wildlife enthusiasts, Tadoba is a
              premier destination. Located in the Chandrapur district, it is one of India's oldest and largest national
              parks and a prime location for spotting the Bengal tiger. The reserve is also home to a diverse range of
              other animals, including leopards, sloth bears, and various species of deer. A jungle safari here offers
              an exhilarating experience in the heart of nature.
            </p>
          </div>

          <img className="w-full md:w-1/2 rounded-3xl" src={assets.maharashtraTadobaAndhariTigerReserve1} />
        </div>

        {/* Mahabaleshwar */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <img className="w-full md:w-1/3 rounded-3xl" src={assets.maharashtraMahabaleshwar} />

          <div className="bg-violet-100 py-6 px-4 text-center w-full md:w-1/3 rounded-md shadow-xl">
            <p>
              <span className="font-bold">Mahabaleshwar:</span> Known as the "Strawberry Capital of India,"
              Mahabaleshwar is a picturesque hill station in the Western Ghats. Its cool climate, dense forests, and
              numerous viewpoints make it a perfect retreat. Visitors can enjoy boating on Venna Lake, explore
              viewpoints with panoramic vistas of valleys and hills, and visit strawberry farms. The nearby town of
              Panchgani is also worth a visit for its Table Land plateau.
            </p>
          </div>

          <img className="w-full md:w-1/3 rounded-3xl" src={assets.maharashtraMahabaleshwar1} />
        </div>
      </div>
    </div>
  );
}

export default Maharashtra;
