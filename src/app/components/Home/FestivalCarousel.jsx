"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./customFestivalSwiper.css";

import { getFestival } from "@/app/constants/festival";
import { calculateDistance } from "@/app/constants/distance";

import FestivalCard from "./FestivalCard";

export default function FestivalCarousel() {
  const [festivalData, setFestivalData] = useState(null);
  useEffect(() => {
    getFestival().then((data) => {
      const slicedData = data.slice(1, 6);
      setFestivalData(slicedData);
    });
    console.log(festivalData);
  }, []);

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
        {festivalData &&
          festivalData.map((data) => (
            <SwiperSlide key={data.id}>
              <div className="flex flex-col justify-center items-center mb-8">
                <FestivalCard
                  imageUrl={data.main_img} // 데이터 객체에 맞게 수정
                  title={data.title}
                  place={data.guname} // 데이터 객체에 맞게 수정
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
