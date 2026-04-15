import assets from "../assets/assets";

function Rajasthan() {
  return (
    <div>
      {/* Banner */}
      <div className="flex flex-col gap-6 md:gap-10 items-center mt-6 px-4 md:px-[5%]">
        <div className="bg-red-200 rounded-full shadow-xl w-full text-center px-4">
          <h1 className="py-2 font-bold text-2xl md:text-[40px]">RAJASTHAN</h1>
        </div>

        <img className="w-full max-w-lg rounded-3xl" src={assets.RajasthanIntex} />

        <p className="w-full md:w-[60%] text-gray-600 text-center md:text-left">
          Rajasthan, known as the "Land of Kings," is a state brimming with history, culture, and stunning landscapes.
        </p>

        <hr className="w-full md:w-[80%] border-red-200 border-2" />
      </div>

      {/* Content */}
      <div className="py-8 px-4 md:px-12 flex flex-col gap-10">
        {/* Jaipur */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <img className="w-full md:w-1/2 rounded-lg" src={assets.rajasthanjaipur} />
          <div className="bg-red-200 py-6 px-4 text-center w-full md:w-1/2 rounded-md shadow-xl">
            <p>
              <span className="font-bold">Jaipur:</span> Known as the "Pink City" for its distinctive colored buildings,
              Jaipur is the capital of Rajasthan and a vibrant hub of culture. Key attractions include the majestic Amer
              Fort, the iconic Hawa Mahal (Palace of Winds), the sprawling City Palace, and the astronomical observatory
              of Jantar Mantar. Jaipur is also a shopper's paradise, with bustling markets selling textiles, jewelry,
              and handicrafts.
            </p>
          </div>
        </div>

        {/* Udaipur */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="bg-red-200 py-6 px-4 text-center w-full md:w-1/2 rounded-md shadow-xl">
            <p>
              <span className="font-bold">Udaipur:</span> Often called the "City of Lakes" or the "Venice of the East,"
              Udaipur is a romantic and picturesque city. It is centered around the serene Lake Pichola, with its
              stunning palaces and havelis reflected in the water. The magnificent City Palace, the beautiful Jag
              Mandir, and the scenic Fateh Sagar Lake are must-visit sites.
            </p>
          </div>
          <img className="w-full md:w-1/2 rounded-3xl" src={assets.rajasthanUdaipur} />
        </div>

        {/* Jodhpur */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <img className="rounded-3xl" src={assets.rajasthanJodhpur1} />
            <img className="rounded-3xl" src={assets.rajasthanJodhpur} />
          </div>

          <div className="bg-red-200 py-6 px-4 text-center w-full md:w-1/2 rounded-md shadow-xl">
            <p>
              <span className="font-bold">Jodhpur:</span> The "Blue City" of Jodhpur stands out with its maze of
              blue-painted houses. The city is dominated by the imposing Mehrangarh Fort, a massive hill-top fortress
              that offers panoramic views of the city. Other highlights include the beautiful Umaid Bhawan Palace and
              the serene Jaswant Thada mausoleum.
            </p>
          </div>
        </div>

        {/* Jaisalmer */}
        <div>
          <div className="bg-red-200 py-6 px-4 text-center rounded-md shadow-xl">
            <p>
              <span className="font-bold">Jaisalmer:</span> Located in the heart of the Thar Desert, Jaisalmer is a
              unique destination known as the "Golden City." The Jaisalmer Fort, a living fort made of yellow sandstone,
              is a UNESCO World Heritage site and a bustling community. Travelers can also explore the ornate havelis
              (mansions) like Patwon Ki Haveli and enjoy a camel safari or an overnight desert camp experience in the
              nearby Sam Sand Dunes.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <img className="w-full md:w-1/2 rounded-3xl" src={assets.rajasthanJaisalmer} />
            <img className="w-full md:w-1/2 rounded-3xl" src={assets.rajasthanJaisalmer1} />
          </div>
        </div>

        {/* Ranthambore */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <img className="rounded-3xl" src={assets.rajasthanRanthambore} />
            <img className="rounded-3xl" src={assets.rajasthanRanthambore1} />
          </div>

          <div className="bg-red-200 py-6 px-4 text-center w-full md:w-1/2 rounded-md shadow-xl">
            <p>
              <span className="font-bold">Ranthambore National Park:</span> For wildlife enthusiasts, Ranthambore is a
              top spot. This is one of the best places in India to spot a Bengal tiger in its natural habitat. The
              national park is also home to a variety of other wildlife, including leopards, sloth bears, and
              crocodiles, as well as the ruins of the historic Ranthambore Fort.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rajasthan;
