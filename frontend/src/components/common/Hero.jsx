import assets from "../../assets/assets";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FaBinoculars } from "react-icons/fa6";
import { FaMapMarkedAlt } from "react-icons/fa";
import "swiper/css";

function Hero() {
  return (
    <section className="md:flex bg-gray-200 px-10 lg:px-28 py-8 justify-between items-center rounded-b-none shadow-md mb-2">
      <div className="hidden lg:block">
        <Swiper
          className="w-[250px] hover:scale-110 transition-all duration-300 ease-in-out"
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000 }}
          speed={1500}
          loop={true}
        >
          <SwiperSlide>
            <div className=" flex-col   gap-5 mt-3 mb-3">
              <img className="rounded-[50px] object-cover h-[400px]  " src={assets.travel1B} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="  flex-col gap-5  mt-2 mb-2">
              <img className="rounded-[50px] object-cover h-[400px]" src={assets.hampiB} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className=" flex-col gap-5  mt-2 mb-2">
              <img className="rounded-[50px] object-cover h-[400px]" src={assets.ootyB} />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="hidden md:block">
        <Swiper
          className="w-[350px] hover:scale-110 transition-all duration-300 ease-in-out "
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000 }}
          speed={1500}
          loop={true}
        >
          <SwiperSlide>
            <div className="sm:flex flex-col  w-full gap-5  mt-2 mb-2">
              <img className="rounded-[50px] object-cover h-[550px] " src={assets.nepalB} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="sm:flex flex-col gap-5 w-full mt-2 mb-2">
              <img className="rounded-[50px] object-cover h-[550px] " src={assets.keralaB} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="sm:flex flex-col gap-5 w-full mt-2 mb-2">
              <img className="rounded-[50px] object-cover h-[550px] w-full" src={assets.lakshadweepB} />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="hidden lg:block ">
        <Swiper
          className="w-[250px] hover:scale-110 transition-all duration-300 ease-in-out "
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000 }}
          speed={1500}
          loop={true}
        >
          <SwiperSlide>
            <div className="sm:flex flex-col   gap-5  mt-2 mb-2">
              <img className="rounded-[50px] object-cover h-[400px] " src={assets.goaB} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="sm:flex flex-col gap-5  mt-2 mb-2">
              <img className="rounded-[50px] object-cover  h-[400px]" src={assets.lakshadweepB} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="sm:flex flex-col gap-5  mt-2 mb-2">
              <img className="rounded-[50px] object-cover h-[400px]" src={assets.himalayaB} />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="max-w-xl ml-3">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">Discover, Share & Book Your Next Journey</h1>

        <p className="mt-4 text-gray-600">
          Explore destinations, share travel experiences, and book hotels — all in one platform.
        </p>

        <div className="mt-6 flex gap-5 items-center justify-center">
          <button className="bg-red-600 text-white px-10 py-3 rounded-full">
            <FaBinoculars size="20" />
          </button>
          <button className="bg-black text-white px-10 py-3 rounded-full">
            <FaMapMarkedAlt size="20" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
