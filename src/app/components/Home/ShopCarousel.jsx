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
    console.log(rankingData);
  }, [rankingData]);

  return (
    <div>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={15}
        mousewheel={true}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {rankingData &&
          rankingData.map((data) => (
            <SwiperSlide key={data.storeId}>
              <div className="block">
                <ShopCard name={data.storeName} market={data.marketName} />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
