"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "./customShopSwiper.css";

import defaultImage from "/public/images/defaultImage.png";
import ShopCard from "./ShopCard";

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
            <ShopCard name="영천동 할머니 떡볶이" market="영천시장" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="block">
            <ShopCard name="영천동 할머니 떡볶이" market="영천시장" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="block">
            <ShopCard name="영천동 할머니 떡볶이" market="영천시장" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="block">
            <ShopCard name="영천동 할머니 떡볶이" market="영천시장" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="block">
            <ShopCard name="영천동 할머니 떡볶이" market="영천시장" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
