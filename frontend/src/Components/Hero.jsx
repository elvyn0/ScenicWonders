import { assets } from "../assets/assets";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";

function Hero() {
  return (
    <section className="bg-gray-200 px-28 py-8 flex  justify-between lg:flex-row items-center  mx-5 rounded-[100px] mt-5 shadow-mg  ">
      <div>
        <Swiper
          className="w-[250px] hover:scale-110 transition ease-in-out"
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000 }}
          speed={1500}
          loop={true}
        >
          <SwiperSlide>
            <div className="hidden sm:flex flex-col   gap-5 mt-3 mb-3">
              <img className="rounded-[50px] object-cover h-[400px]  " src={assets.travel1B} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className=" hidden sm:flex flex-col gap-5  mt-2 mb-2">
              <img className="rounded-[50px] object-cover h-[400px]" src={assets.hampiB} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className=" hidden sm:flex flex-col gap-5  mt-2 mb-2">
              <img className="rounded-[50px] object-cover h-[400px]" src={assets.ootyB} />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div>
        <Swiper
          className="w-[350px] hover:scale-110 transition ease-in-out "
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000 }}
          speed={1500}
          loop={true}
        >
          <SwiperSlide>
            <div className="hidden sm:flex flex-col  w-full gap-5  mt-2 mb-2">
              <img className="rounded-[50px] object-cover h-[550px] " src={assets.nepalB} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className=" hidden sm:flex flex-col gap-5 w-full mt-2 mb-2">
              <img className="rounded-[50px] object-cover h-[550px] " src={assets.keralaB} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className=" hidden sm:flex flex-col gap-5 w-full mt-2 mb-2">
              <img className="rounded-[50px] object-cover h-[550px] w-full" src={assets.lakshadweepB} />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div>
        <Swiper
          className="w-[250px] hover:scale-110 transition ease-in-out "
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000 }}
          speed={1500}
          loop={true}
        >
          <SwiperSlide>
            <div className="hidden sm:flex flex-col   gap-5  mt-2 mb-2">
              <img className="rounded-[50px] object-cover h-[400px] " src={assets.goaB} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className=" hidden sm:flex flex-col gap-5  mt-2 mb-2">
              <img className="rounded-[50px] object-cover  h-[400px]" src={assets.lakshadweepB} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className=" hidden sm:flex flex-col gap-5  mt-2 mb-2">
              <img className="rounded-[50px] object-cover h-[400px]" src={assets.himalayaB} />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}

export default Hero;
