import { assets } from "../assets/assets";

function Kerala() {
  return (
    <div className="flex flex-col justify-center   items-center ml-[6%]">
      {/* Banner contant */}
      <div className=" flex flex-col justify-center items-center mt-8 ">
        <div className="bg-green-100 rounded-full  shadow-xl w-full text-center   px-4  ">
          <h1 className=" py-1  font-bold text-[40px]">Kerala</h1>
        </div>
        <div className="mt-10">
          <img className="w-[400px] rounded-3xl" src={assets.keralaB} />
        </div>
        <p className="w-[45%] mt-5 text-gray-600">
          Kerala, often referred to as "God's Own Country," is a tropical paradise in the south of India known for its
          diverse landscapes, from serene backwaters and lush tea plantations to beautiful beaches and wildlife.
        </p>
        <hr className="w-[80%] mt-6 border-green-200 border-2" />
      </div>

      {/* About Kerala  */}
      <div className=" py-20  flex flex-col gap-14">
        <div className="flex flex-row justify-between items-center">
          <div className="  bg-green-100 py-10 px-5 text-center w-[600px]  rounded-md shadow-xl ">
            <p className="  ">
              <span className="font-bold">Alleppey (Alappuzha): </span> The undisputed highlight of a trip to Kerala is
              a houseboat cruise through the backwaters of Alleppey. Often called the "Venice of the East," Alleppey is
              a hub of interlocking canals, lagoons, and lakes. Staying in a traditional houseboat and gliding past
              paddy fields, coconut groves, and local villages is a peaceful and unique experience.
            </p>
          </div>
          <div className="w-[600px] ">
            <img className="w-full rounded-3xl" src={assets.KeralaAllapy} />
          </div>
        </div>

        <div className="flex items-center justify-between  gap-24  ">
          <div className=" flex flex-col gap-5">
            <img className="rounded-3xl" src={assets.KeralaMunnar} />
            <img className="rounded-3xl" src={assets.KeralaMunnar1} />
          </div>

          <div className="  bg-green-100  py-12  px-14 text-center  items-center rounded-md shadow-xl ">
            <p>
              <span className="font-bold">Munnar: </span> This hill station is a breathtaking destination known for its
              rolling hills covered in manicured tea plantations. Munnar's cool, misty climate offers a refreshing
              escape. Travelers can visit the Tea Museum, explore Eravikulam National Park (home to the endangered
              Nilgiri Tahr), and enjoy panoramic views from viewpoints like Top Station and Echo Point.
            </p>
          </div>
        </div>

        <div className=" flex flex-col justify-center  ">
          <div className=" flex justify-center ">
            <img className="w-[400px]  rounded-3xl" src={assets.keralaWayanad1} />
          </div>
          <div className=" flex items-center ml-80 mt-16  bg-green-100 py-10 px-5 text-center w-[900px]  rounded-md shadow-xl ">
            <p className="  ">
              <span className="font-bold">Wayanad:</span> Located in the Western Ghats, Wayanad is a green paradise
              known for its dense forests, spice plantations, and scenic waterfalls. It offers a perfect retreat for
              trekking and adventure. Notable sites include the ancient Edakkal Caves with their prehistoric carvings,
              the beautiful Soochipara Falls, and the towering Chembra Peak.
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center  ">
          <div className=" bg-green-100  py-10  px-14 text-center w-[700px]   rounded-md shadow-xl ">
            <p>
              <span className="font-bold"> Kochi (Cochin): </span> A port city with a rich history, Kochi is a
              fascinating blend of old-world charm and modern city life. It has been a trading hub for centuries, and
              its diverse past is reflected in its architecture and culture. Key attractions include the iconic Chinese
              fishing nets, the historic Fort Kochi, Mattancherry Palace, and the Paradesi Synagogue.
            </p>
          </div>
          <div className="w-[600px]">
            <img className="rounded-3xl" src={assets.keralaKochi} />
          </div>
        </div>

        <div className="flex flex-row justify-between items-center ">
          <div className="w-[600px]">
            <img className="rounded-3xl" src={assets.keralaThekkady} />
          </div>
          <div className="   bg-green-100  py-10  px-10 text-center w-[700px]   rounded-md shadow-xl ">
            <p>
              <span className="font-bold"> Thekkady:</span> For wildlife and nature lovers, Thekkady is a must-visit.
              It's home to the Periyar National Park, one of the most famous wildlife sanctuaries in India. A boat
              safari on Periyar Lake is a popular way to spot elephants, tigers, and a variety of other animals and
              birds in their natural habitat. The area is also known for its spice plantations, and visitors can take
              tours to learn about cardamom, pepper, and cinnamon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kerala;
