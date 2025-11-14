import { assets } from "../assets/assets";

function Rajasthan() {
  return (
    <div className="">
      {/* Banner contant */}
      <div className="flex flex-col gap-5 justify-center items-center mt-8 px-[6%] ">
        <div className="bg-red-200 rounded-full  shadow-xl w-full text-center   px-4  ">
          <h1 className=" py-1  font-bold text-[40px]">RAJASTHAN</h1>
        </div>
        <div className="mt-10">
          <img className="w-[650px]  rounded-3xl" src={assets.RajasthanIntex} />
        </div>
        <p className="w-[45%] mt-5 text-gray-600">
          Rajasthan, known as the "Land of Kings," is a state brimming with history, culture, and stunning landscapes.
        </p>
        <hr className="w-[80%] mt-3 border-red-200 border-2" />
      </div>

      {/* About Rajasthan  */}
      <div className=" py-20 px-40 flex flex-col gap-14">
        <div className="flex justify-between items-center">
          <div className="w-[600px] ">
            <img className="w-full rounded-lg" src={assets.rajasthanjaipur} />
          </div>
          <div className="  bg-red-200 py-10 px-5 text-center w-[550px]  rounded-md shadow-xl ">
            <p className="  ">
              <span className="font-bold">Jaipur: </span> Known as the "Pink City" for its distinctive colored
              buildings, Jaipur is the capital of Rajasthan and a vibrant hub of culture. Key attractions include the
              majestic Amer Fort, the iconic Hawa Mahal (Palace of Winds), the sprawling City Palace, and the
              astronomical observatory of Jantar Mantar. Jaipur is also a shopper's paradise, with bustling markets
              selling textiles, jewelry, and handicrafts.
            </p>
          </div>
        </div>

        <div className="flex   items-center justify-between">
          <div className=" bg-red-200  py-12  px-14 text-center w-[600px] rounded-md shadow-xl ">
            <p>
              <span className="font-bold">Udaipur:</span> Often called the "City of Lakes" or the "Venice of the East,"
              Udaipur is a romantic and picturesque city. It is centered around the serene Lake Pichola, with its
              stunning palaces and havelis reflected in the water. The magnificent City Palace, the beautiful Jag
              Mandir, and the scenic Fateh Sagar Lake are must-visit sites.
            </p>
          </div>
          <div className="w-[700px]">
            <img className="rounded-3xl" src={assets.rajasthanUdaipur} />
          </div>
        </div>

        <div className="flex flex-row justify-between items-center  ">
          <div className="w-[500px]">
            <img className="rounded-3xl" src={assets.rajasthanJodhpur1} />
            <img className="rounded-3xl mt-10" src={assets.rajasthanJodhpur} />
          </div>
          <div className="   bg-red-200  py-10  px-14 text-center w-[600px]   rounded-md shadow-xl ">
            <p>
              <span className="font-bold"> Jodhpur: </span> The "Blue City" of Jodhpur stands out with its maze of
              blue-painted houses. The city is dominated by the imposing Mehrangarh Fort, a massive hill-top fortress
              that offers panoramic views of the city. Other highlights include the beautiful Umaid Bhawan Palace and
              the serene Jaswant Thada mausoleum.
            </p>
          </div>
        </div>

        <div className=" ">
          <div className="flex items-center bg-red-200 py-10 px-5 text-center   rounded-md shadow-xl ">
            <p className="  ">
              <span className="font-bold">Jaisalmer: </span> Located in the heart of the Thar Desert, Jaisalmer is a
              unique destination known as the "Golden City." The Jaisalmer Fort, a living fort made of yellow sandstone,
              is a UNESCO World Heritage site and a bustling community. Travelers can also explore the ornate havelis
              (mansions) like Patwon Ki Haveli and enjoy a camel safari or an overnight desert camp experience in the
              nearby Sam Sand Dunes.
            </p>
          </div>
          <div className=" flex flex-row gap-5 justify-center mt-10 ">
            <img className="w-[600px] rounded-3xl" src={assets.rajasthanJaisalmer} />

            <img className=" w-[800px] rounded-3xl" src={assets.rajasthanJaisalmer1} />
          </div>
        </div>

        <div className=" flex justify-between gap-5 items-center  ">
          <div className="w-[600px]  ">
            <img className="rounded-3xl mb-5" src={assets.rajasthanRanthambore} />
            <img className="rounded-3xl " src={assets.rajasthanRanthambore1} />
          </div>
          <div className="   bg-red-200  py-10  px-10 text-center    rounded-md shadow-xl ">
            <p>
              <span className="font-bold">Ranthambore National Park: </span> For wildlife enthusiasts, Ranthambore is a
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
