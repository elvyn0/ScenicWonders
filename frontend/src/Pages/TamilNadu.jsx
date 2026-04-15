import assets from "../assets/assets";

function TamilNadu() {
  return (
    <div>
      {/* Banner */}
      <div className="flex flex-col gap-6 md:gap-10 items-center mt-6 px-4 md:px-[5%]">
        <div className="bg-yellow-100 rounded-full shadow-xl w-full text-center px-4">
          <h1 className="py-2 font-bold text-2xl md:text-[40px]">Tamil Nadu</h1>
        </div>

        <img className="w-full max-w-md md:max-w-lg rounded-3xl" src={assets.tamilNadu} />

        <p className="w-full md:w-[60%] text-gray-600 text-center md:text-left">
          Tamil Nadu is a state that offers a rich tapestry of history, culture, and nature. From ancient temples to
          beautiful hill stations and coastal towns, there's something for every type of traveler...
        </p>

        <hr className="w-full md:w-[80%] border-yellow-200 border-2" />
      </div>

      {/* Content */}
      <div className="py-8 px-4 md:px-12 flex flex-col gap-10">
        {/* Madurai */}
        <div>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <img className="w-full max-w-md rounded-lg" src={assets.tamilNaduMadurai} />
            <img className="w-full max-w-md rounded-lg" src={assets.tamilNaduMadurai2} />
          </div>

          <div className="bg-yellow-100 py-6 px-4 mt-6 text-center rounded-md shadow-xl">
            <p>
              <span className="font-bold">Madurai:</span> Known as the "Athens of the East," Madurai is one of India's
              oldest continuously inhabited cities and a major pilgrimage center. The centerpiece is the breathtaking
              Meenakshi Amman Temple, a masterpiece of Dravidian architecture with its towering gopurams (gateways)
              covered in intricate, colorful sculptures. The city is a vibrant cultural hub, and a visit here is a deep
              dive into Tamil tradition and history.
            </p>
          </div>
        </div>

        {/* Ooty */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="bg-yellow-100 py-6 px-4 text-center w-full md:w-1/2 rounded-md shadow-xl">
            <p>
              <span className="font-bold">Ooty:</span> Located in the Nilgiri Hills, Ooty, or Udhagamandalam, is a
              charming hill station often called the "Queen of Hill Stations." It's famous for its pleasant climate,
              rolling hills, and tea plantations. Highlights include the Nilgiri Mountain Railway, a UNESCO World
              Heritage site, boating on the tranquil Ooty Lake, and the lush Botanical Gardens.
            </p>
          </div>
          <img className="w-full md:w-1/2 rounded-3xl" src={assets.tamilNaduOoty1} />
        </div>

        {/* Mahabalipuram */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <img className="rounded-3xl" src={assets.tamilNaduMahabalipuram} />
            <img className="rounded-3xl" src={assets.tamilNaduShoreTemple} />
          </div>

          <div className="bg-yellow-100 py-6 px-4 text-center w-full md:w-1/2 rounded-md shadow-xl">
            <p>
              <span className="font-bold">Mahabalipuram:</span> Also known as Mamallapuram, this town is a UNESCO World
              Heritage site renowned for its 7th and 8th-century rock-cut temples and monuments. These architectural
              marvels, built by the Pallava dynasty, include the iconic Shore Temple, the Five Rathas (monolithic
              temples carved in the shape of chariots), and a giant open-air rock relief known as "Arjuna's Penance.
            </p>
          </div>
        </div>

        {/* Kanyakumari */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="bg-yellow-100 py-6 px-4 text-center w-full md:w-1/2 rounded-md shadow-xl">
            <p>
              <span className="font-bold">Kanyakumari:</span> Situated at the southernmost tip of the Indian
              subcontinent, Kanyakumari is a unique coastal town where the Arabian Sea, the Bay of Bengal, and the
              Indian Ocean converge. It's a popular pilgrimage site and a great place to witness spectacular sunrises
              and sunsets over the ocean. Key attractions include the Vivekananda Rock Memorial and the Thiruvalluvar
              Statue, both majestically located on rocky outcrops in the sea.
            </p>
          </div>
          <img className="w-full md:w-1/2 rounded-3xl" src={assets.tamilNadukanyakumari} />
        </div>

        {/* Rameshwaram */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <img className="w-full md:w-1/3 rounded-3xl" src={assets.tamilNaduRameshwaram} />

          <div className="bg-yellow-100 py-6 px-4 text-center w-full md:w-1/2 rounded-md shadow-xl">
            <p>
              <span className="font-bold">Rameshwaram:</span> A significant Hindu pilgrimage town, Rameshwaram is
              located on Pamban Island. It is believed to be the place where Lord Rama built a bridge to Sri Lanka to
              rescue his wife Sita. The Ramanathaswamy Temple is the main attraction, famous for having the longest
              temple corridor in India. The town is also a gateway to Dhanushkodi, a ghost town with a hauntingly
              beautiful beach at the meeting point of two seas.
            </p>
          </div>

          <img className="w-full md:w-1/3 rounded-3xl" src={assets.tamilNaudDhanushkodi} />
        </div>
      </div>
    </div>
  );
}

export default TamilNadu;
