"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "./customShopSwiper.css";

import defaultImage from "/public/images/defaultImage.png";

export default function ShopCarousel() {
  return (
    <div>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={15}
        mousewheel={true}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <div className="block">
            <Image src={defaultImage} layout="responsive" alt="기본 이미지" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="block">
            <Image src={defaultImage} layout="responsive" alt="기본 이미지" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="block">
            <Image src={defaultImage} layout="responsive" alt="기본 이미지" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="block">
            <Image src={defaultImage} layout="responsive" alt="기본 이미지" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="block">
            <Image src={defaultImage} layout="responsive" alt="기본 이미지" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
