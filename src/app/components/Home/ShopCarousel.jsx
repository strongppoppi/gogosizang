"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "./customShopSwiper.css";

import defaultImage from "/public/images/defaultImage.png";

export default function ShopCarousel() {
  return (
    <div>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={15}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        mousewheel={true}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <div className="block mb-8">
            <Image src={defaultImage} layout="responsive" alt="기본 이미지" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="block mb-8">
            <Image src={defaultImage} layout="responsive" alt="기본 이미지" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="block mb-8">
            <Image src={defaultImage} layout="responsive" alt="기본 이미지" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="block mb-8">
            <Image src={defaultImage} layout="responsive" alt="기본 이미지" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="block mb-8">
            <Image src={defaultImage} layout="responsive" alt="기본 이미지" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
