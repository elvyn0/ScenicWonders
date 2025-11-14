import { assets } from "../assets/assets";

function Maharashtra() {
  return (
    <div className="">
      {/* Banner contant */}
      <div className="flex flex-col gap-5 justify-center items-center mt-8 px-[6%]">
        <div className="bg-violet-100 rounded-full  shadow-xl w-full text-center   px-4  ">
          <h1 className=" py-1  font-bold text-[40px]">Maharashtra</h1>
        </div>
        <div className="mt-10">
          <img className="w-[600px]  rounded-3xl" src={assets.maharashtraMumbai1} />
        </div>
        <p className=" mt-3 text-gray-600">
          Maharashtra is a vast state with a wide range of attractions, from bustling cities and ancient caves to
          tranquil hill stations and stunning coastal stretches.
        </p>
        <hr className="w-[80%] mt-10 border-violet-200 border-2" />
      </div>

      {/* About Maharashtra  */}
      <div className=" py-20 px-32 flex flex-col gap-10">
        <div className="flex justify-between items-center ">
          <div className="w-[500px] ">
            <img className="w-full rounded-lg" src={assets.maharashtraMumbai} />
          </div>
          <div className=" bg-violet-100 py-10 px-5 text-center w-[600px] rounded-md shadow-xl ">
            <p className="  ">
              <span className="font-bold">Mumbai:</span> As the financial and entertainment capital of India, Mumbai is
              a city of dreams and contrasts. It's a city that never sleeps, with a vibrant energy that's infectious.
              Must-visit places include the iconic Gateway of India, the beautiful Marine Drive (also known as the
              "Queen's Necklace"), the historical Chhatrapati Shivaji Maharaj Terminus, and the bustling Colaba
              Causeway. You can also take a ferry to the ancient Elephanta Caves, a UNESCO World Heritage site with
              stunning rock-cut sculptures.
            </p>
          </div>
        </div>

        <div className="flex items-center  justify-between">
          <div className=" bg-violet-100  py-12  px-14 text-center w-[600px]  rounded-md shadow-xl ">
            <p>
              <span className="font-bold">Ajanta and Ellora Caves:</span> Located near Aurangabad, these two UNESCO
              World Heritage sites are a testament to ancient Indian art and spirituality. The Ajanta Caves are a
              complex of rock-cut Buddhist cave monuments dating from the 2nd century BCE to about 480 CE, famous for
              their beautiful mural paintings. The Ellora Caves showcase a unique blend of Buddhist, Hindu, and Jain
              art, with magnificent rock-cut temples and monasteries carved out of a single cliff.
            </p>
          </div>
          <div className="w-[400px] my-10 ">
            <img className="rounded-3xl mb-5" src={assets.maharashtraAjantaAndElloraCaves} />
            <img className="rounded-3xl mb-5" src={assets.maharashtraAjantaAndElloraCaves1} />
            <img className="rounded-3xl" src={assets.maharashtraAjantaAndElloraCaves2} />
          </div>
        </div>

        <div className="flex  justify-between items-center">
          <div className="w-[500px]">
            <img className="rounded-3xl" src={assets.maharashtraKhandala} />
            <img className="rounded-3xl mt-10" src={assets.maharashtraLonavala1} />
          </div>
          <div className="  bg-violet-100  py-10  px-14 text-center w-[600px]  rounded-md shadow-xl ">
            <p>
              <span className="font-bold"> Lonavala & Khandala:</span> These twin hill stations are a popular escape
              from the heat and hustle of Mumbai and Pune. Located in the Sahyadri mountains, they offer lush green
              landscapes, cascading waterfalls (especially during the monsoon), and a pleasant climate. Travelers can
              enjoy scenic viewpoints like Tiger's Point and Duke's Nose, visit the serene Lonavala Lake, and explore
              the ancient Karla and Bhaja Caves.
            </p>
          </div>
        </div>

        <div className="flex justify-between  items-center">
          <div className=" bg-violet-100 py-10 px-5 text-center w-[550px]  rounded-md shadow-xl ">
            <p className="  ">
              <span className="font-bold">Tadoba Andhari Tiger Reserve:</span> For wildlife enthusiasts, Tadoba is a
              premier destination. Located in the Chandrapur district, it is one of India's oldest and largest national
              parks and a prime location for spotting the Bengal tiger. The reserve is also home to a diverse range of
              other animals, including leopards, sloth bears, and various species of deer. A jungle safari here offers
              an exhilarating experience in the heart of nature.
            </p>
          </div>
          <div className="w-[600px] ">
            <img className="w-full rounded-3xl" src={assets.maharashtraTadobaAndhariTigerReserve1} />
          </div>
        </div>

        <div className="flex  justify-between items-center">
          <div className="w-[500px] ">
            <img className="rounded-3xl" src={assets.maharashtraMahabaleshwar} />
          </div>
          <div className="  bg-violet-100  py-10  px-10 text-center w-[600px]  rounded-md shadow-xl ">
            <p>
              <span className="font-bold"> Mahabaleshwar:</span> Known as the "Strawberry Capital of India,"
              Mahabaleshwar is a picturesque hill station in the Western Ghats. Its cool climate, dense forests, and
              numerous viewpoints make it a perfect retreat. Visitors can enjoy boating on Venna Lake, explore
              viewpoints with panoramic vistas of valleys and hills, and visit strawberry farms. The nearby town of
              Panchgani is also worth a visit for its Table Land plateau.
            </p>
          </div>
          <div className="w-[400px]">
            <img className="rounded-3xl " src={assets.maharashtraMahabaleshwar1} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Maharashtra;
