import assets from "../assets/assets";

function Kerala() {
  return (
    <div>
      {/* Banner */}
      <div className="flex flex-col gap-5 items-center mt-6 px-4 md:px-[6%]">
        <div className="bg-green-100 rounded-full shadow-xl w-full text-center px-4">
          <h1 className="py-2 font-bold text-2xl md:text-[40px]">Kerala</h1>
        </div>

        <img className="w-full max-w-lg   object-cover rounded-3xl" src={assets.keralaB} />

        <p className="w-full md:w-[60%] text-center md:text-left text-gray-600">
          Kerala, often referred to as "God's Own Country," is a tropical paradise in the south of India known for its
          diverse landscapes, from serene backwaters and lush tea plantations to beautiful beaches and wildlife.
        </p>

        <hr className="w-full md:w-[80%] border-green-200 border-2" />
      </div>

      {/* Content */}
      <div className="py-10 px-4 md:px-12 flex flex-col gap-10">
        {/* Alleppey */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="bg-green-100 py-6 px-4 text-center w-full md:w-1/2 rounded-md shadow-xl">
            <p>
              <span className="font-bold">Alleppey (Alappuzha):</span> The undisputed highlight of a trip to Kerala is a
              houseboat cruise through the backwaters of Alleppey. Often called the "Venice of the East," Alleppey is a
              hub of interlocking canals, lagoons, and lakes. Staying in a traditional houseboat and gliding past paddy
              fields, coconut groves, and local villages is a peaceful and unique experience.
            </p>
          </div>
          <img className="w-full md:w-1/2 rounded-lg" src={assets.KeralaAllapy} />
        </div>

        {/* Munnar */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <img className="rounded-3xl" src={assets.KeralaMunnar} />
            <img className="rounded-3xl" src={assets.KeralaMunnar1} />
          </div>

          <div className="bg-green-100 py-6 px-4 text-center w-full md:w-1/2 rounded-md shadow-xl">
            <p>
              <span className="font-bold">Munnar:</span> This hill station is a breathtaking destination known for its
              rolling hills covered in manicured tea plantations. Munnar's cool, misty climate offers a refreshing
              escape. Travelers can visit the Tea Museum, explore Eravikulam National Park (home to the endangered
              Nilgiri Tahr), and enjoy panoramic views from viewpoints like Top Station and Echo Point.
            </p>
          </div>
        </div>

        {/* Wayanad */}
        <div className="flex flex-col items-center gap-6">
          <img className="w-full max-w-md rounded-3xl" src={assets.keralaWayanad1} />

          <div className="bg-green-100 py-6 px-4 text-center w-full md:w-[70%] rounded-md shadow-xl">
            <p>
              <span className="font-bold">Wayanad:</span> Located in the Western Ghats, Wayanad is a green paradise
              known for its dense forests, spice plantations, and scenic waterfalls. It offers a perfect retreat for
              trekking and adventure. Notable sites include the ancient Edakkal Caves with their prehistoric carvings,
              the beautiful Soochipara Falls, and the towering Chembra Peak.
            </p>
          </div>
        </div>

        {/* Kochi */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="bg-green-100 py-6 px-4 text-center w-full md:w-1/2 rounded-md shadow-xl">
            <p>
              <span className="font-bold">Kochi (Cochin):</span> A port city with a rich history, Kochi is a fascinating
              blend of old-world charm and modern city life. It has been a trading hub for centuries, and its diverse
              past is reflected in its architecture and culture. Key attractions include the iconic Chinese fishing
              nets, the historic Fort Kochi, Mattancherry Palace, and the Paradesi Synagogue.
            </p>
          </div>
          <img className="w-full md:w-1/2 rounded-3xl" src={assets.keralaKochi} />
        </div>

        {/* Thekkady */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <img className="w-full md:w-1/2 rounded-3xl" src={assets.keralaThekkady} />

          <div className="bg-green-100 py-6 px-4 text-center w-full md:w-1/2 rounded-md shadow-xl">
            <p>
              <span className="font-bold">Thekkady:</span> For wildlife and nature lovers, Thekkady is a must-visit.
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
