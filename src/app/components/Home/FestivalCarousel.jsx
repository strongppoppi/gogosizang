"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./customFestivalSwiper.css";

import FestivalCard from "./FestivalCard";

export default function FestivalCarousel() {
  return (
    <div className="flex flex-row justify-center items-center mb-4">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={true}
        modules={[Navigation, Pagination]}
        mousewheel={true}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <div className="flex flex-col justify-center items-center mb-8">
            <FestivalCard />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col justify-center items-center mb-8">
            <FestivalCard />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col justify-center items-center mb-8">
            <FestivalCard />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
