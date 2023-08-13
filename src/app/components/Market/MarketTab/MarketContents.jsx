import { Swiper, SwiperSlide } from "swiper/react";
import ContentCard from "./ContentCard";
import defaultImage from "/public/images/defaultImage.png";

import "swiper/css";
import "./ContentCarousel.css";

export default function MarketContents() {
  return (
    <div className="w-full bg-gray-100 pt-[25px] pb-[25px]">
      <h1 className="text-[17px] font-medium text-black px-5">
        이 시장에 포함된 큐레이팅 (2)
      </h1>
      <Swiper slidesPerView={"auto"} spaceBetween={15}>
        <SwiperSlide>
          <ContentCard
            imageUrl="https://i.ibb.co/drd0fDc/3-bg-Image.png"
            title="감탄밖에 안 나오는 <strong class='text-main'>레전드 떡볶이 맛집 list</strong>"
          />
        </SwiperSlide>
        <SwiperSlide>
          <ContentCard
            imageUrl="https://i.ibb.co/Wcn35dk/4-bg-Image.png"
            title="알뜰싱싱 과일가게 대공개 <strong class='text-main'>자취생도 부담없어!</strong>"
          />
        </SwiperSlide>
      </Swiper>
      <div className="w-[calc(100vw-40px)] h-px mx-5 mt-[5px] mb-5 bg-gray-300" />
      <h1 className="text-[17px] font-medium text-black px-5">
        놀거리 / 즐길거리 (2)
      </h1>
      <Swiper slidesPerView={"auto"} spaceBetween={15}>
        <SwiperSlide>
          <ContentCard
            imageUrl="https://i.ibb.co/1JRrFk5/1-bg-Image.jpg"
            title="영천시장에서 <strong class='text-main'>🍧무더위를 날리는 방법</strong> 5가지!"
          />
        </SwiperSlide>
        <SwiperSlide>
          <ContentCard
            imageUrl="https://i.ibb.co/1qrHCsy/2-bg-Image.png"
            title="<strong class='text-main'>비 오는 날</strong>, 전통시장은 이렇게 즐기세요!"
          />
        </SwiperSlide>
      </Swiper>
      <div className="w-[calc(100vw-40px)] h-px mx-5 mt-[5px] mb-5 bg-gray-300" />
      <h1 className="text-[17px] font-medium text-black px-5">
        블로그 리뷰 (2)
      </h1>
      <Swiper slidesPerView={"auto"} spaceBetween={15}>
        <SwiperSlide>
          <ContentCard
            imageUrl="https://i.ibb.co/WPRMBhm/1.jpg"
            title="제목 영천시장 달인 꽈배기♡"
          />
        </SwiperSlide>
        <SwiperSlide>
          <ContentCard
            imageUrl="https://i.ibb.co/gZCgCY4/1.jpg"
            title="영천시장 카페 떡마을 팥빙수 후기"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
