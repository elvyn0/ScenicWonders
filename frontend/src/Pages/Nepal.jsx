import { assets } from "../assets/assets";

function Nepal() {
  return (
    <div className="">
      {/* Banner contant */}
      <div className="flex flex-col gap-5 justify-center items-center mt-8 px-[15%]">
        <div className="bg-blue-100 rounded-full  shadow-xl w-full text-center   px-4  ">
          <h1 className=" py-1  font-bold text-[40px]">NEPAL</h1>
        </div>
        <div className="mt-10">
          <img className="w-[600px]  rounded-3xl" src={assets.nepalBanner} />
        </div>
        <p className="w-[45%] mt-5 text-gray-600">
          Nepal is a land of incredible diversity, offering a unique blend of cultural heritage, breathtaking natural
          beauty, and thrilling adventure.
        </p>
        <hr className="w-[80%] mt-3 border-blue-200 border-2" />
      </div>

      {/* About Nepal  */}
      <div className=" py-20 px-32 flex flex-col gap-14">
        <div className="flex justify-between items-center">
          <div className="w-[600px] ">
            <img className="w-full rounded-lg" src={assets.nepalKathmanduValley} />
          </div>
          <div className="  bg-blue-100 py-10 px-5 text-center w-[550px]  rounded-md shadow-xl ">
            <p className="  ">
              <span className="font-bold">Kathmandu Valley: </span> The capital city and its surrounding valley are the
              cultural heart of Nepal. Kathmandu is a bustling hub filled with ancient temples, bustling markets, and
              UNESCO World Heritage sites. Must-see places include the historic Durbar Squares of Kathmandu, Patan, and
              Bhaktapur, as well as the important Buddhist stupas of Swayambhunath (the "Monkey Temple") and Boudhanath,
              and the Hindu pilgrimage site of Pashupatinath Temple.
            </p>
          </div>
        </div>

        <div className="flex  justify-between itmes-center ">
          <div className=" w-[600px] bg-blue-100  pt-24 px-5 text-center rounded-md shadow-xl ">
            <p>
              <span className="font-bold">Chitwan National Park:</span> This UNESCO World Heritage site offers a
              different side of Nepal, focusing on wildlife and jungle adventures. Visitors can go on a safari to spot a
              variety of animals, including the one-horned rhinoceros, Bengal tigers, and various bird species.
              Activities include jungle walks, canoe rides, and birdwatching tours.
            </p>
          </div>
          <div className="w-[600px]">
            <img className="rounded-3xl" src={assets.nepalChitwan} />
          </div>
        </div>

        <div className="flex  justify-between  gap-10 items-center">
          <div className="w-[500px]">
            <img className="rounded-3xl" src={assets.nepalPokhara1} />
            <img className="rounded-3xl mt-10 " src={assets.nepalPokhara} />
          </div>
          <div className="  bg-blue-100  py-10  px-14 text-center w-[600px]   rounded-md shadow-xl ">
            <p>
              <span className="font-bold"> Pokhara:</span> Known as the "Gateway to the Annapurna Circuit," Pokhara is a
              picturesque city renowned for its serene lakes and stunning views of the Himalayas. Travelers can enjoy
              boating on the calm waters of Phewa Lake, visit the World Peace Pagoda for panoramic mountain vistas, and
              indulge in adventure sports like paragliding and zip-lining. Pokhara's laid-back atmosphere makes it a
              perfect place to relax and enjoy the scenery.
            </p>
          </div>
        </div>

        <div className="flex justify-between  items-center">
          <div className="  bg-blue-100 py-10 px-5 text-center w-[550px]  rounded-md shadow-xl ">
            <p className="  ">
              <span className="font-bold">Everest Base Camp / Annapurna Circuit:</span> For adventure seekers, trekking
              in the Himalayas is a quintessential Nepali experience. The Everest Base Camp trek takes you to the foot
              of the world's highest peak, Mount Everest, while the Annapurna Circuit offers a diverse journey through
              lush forests, traditional villages, and high mountain passes. Both treks provide awe-inspiring views and a
              deep dive into local Sherpa culture.
            </p>
          </div>
          <div className="w-[600px] ">
            <img className="w-full rounded-3xl" src={assets.nepalEverestBase} />
          </div>
        </div>

        <div className="flex flex-row justify-center gap-10 items-center ">
          <div className="w-[500px]">
            <img className="rounded-3xl" src={assets.nepalLumbini} />
          </div>
          <div className="  bg-blue-100  py-10  px-10 text-center w-[600px]  rounded-md shadow-xl ">
            <p>
              <span className="font-bold"> Lumbini:</span> As the birthplace of Lord Buddha, Lumbini is a profoundly
              spiritual destination and a significant pilgrimage site for Buddhists worldwide. The site is home to the
              sacred Maya Devi Temple, the Ashoka Pillar, and numerous monasteries built by different countries, each
              showcasing unique architectural styles. It's a place of peace and reflection for all visitors.
            </p>
          </div>
          <div className="w-[400px] ">
            <img className="rounded-3xl " src={assets.nepalLumbini1} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nepal;
