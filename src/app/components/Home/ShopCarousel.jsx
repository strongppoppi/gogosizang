"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "./customShopSwiper.css";

import ShopCard from "./ShopCard";
import { fetchRankingData } from "@/app/constants/ranking";

export default function ShopCarousel() {
  const [rankingData, setRankingData] = useState([]);

  useEffect(() => {
    fetchRankingData({ rankingData, setRankingData });
  }, []);

  const generateSwiperSlides = () => {
    if (!rankingData) {
      return null;
    }

    return rankingData.map((data) => (
      <SwiperSlide key={data.storeId}>
        <div className="block">
          <ShopCard
            name={data.storeName}
            market={data.marketName}
            marketKey={data.marketId}
            storeKey={data.storeId}
          />
        </div>
      </SwiperSlide>
    ));
  };

  return (
    <div>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={15}
        mousewheel={true}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {generateSwiperSlides()}
      </Swiper>
    </div>
  );
}
