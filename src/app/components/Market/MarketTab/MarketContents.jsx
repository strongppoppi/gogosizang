import { Swiper, SwiperSlide } from "swiper/react";
import ContentCard from "./ContentCard";
import defaultImage from "/public/images/defaultImage.png";

import "swiper/css";
import "./ContentCarousel.css";

export default function MarketContents() {
    return (
        <div className="w-full bg-gray-100 pt-[25px] pb-[25px]">
            <h1 className="text-[17px] font-medium text-black px-5">이 시장에 포함된 큐레이팅 (4)</h1>
            <Swiper
                slidesPerView={"auto"}
                spaceBetween={15}>
                <SwiperSlide>
                    <ContentCard imageUrl={defaultImage} title="영천시장에서 <strong class='text-main'>🍧무더위를 날리는 방법</strong> 5가지!" />
                </SwiperSlide>
                <SwiperSlide>
                    <ContentCard imageUrl={defaultImage} title="영천시장에서 <strong class='text-main'>🍧무더위를 날리는 방법</strong> 5가지!" />
                </SwiperSlide>
                <SwiperSlide>
                    <ContentCard imageUrl={defaultImage} title="영천시장에서 <strong class='text-main'>🍧무더위를 날리는 방법</strong> 5가지!" />
                </SwiperSlide>
                <SwiperSlide>
                    <ContentCard imageUrl={defaultImage} title="영천시장에서 <strong class='text-main'>🍧무더위를 날리는 방법</strong> 5가지!" />
                </SwiperSlide>
                <SwiperSlide>
                    <ContentCard imageUrl={defaultImage} title="영천시장에서 <strong class='text-main'>🍧무더위를 날리는 방법</strong> 5가지!" />
                </SwiperSlide>
            </Swiper>
            <div className="w-[calc(100vw-40px)] h-px mx-5 mt-[5px] mb-5 bg-gray-300" />
            <h1 className="text-[17px] font-medium text-black px-5">놀거리 / 즐길거리 (2)</h1>
            <Swiper
                slidesPerView={"auto"}
                spaceBetween={15}>
                <SwiperSlide>
                    <ContentCard imageUrl={defaultImage} title="영천시장에서 <strong class='text-main'>🍧무더위를 날리는 방법</strong> 5가지!" />
                </SwiperSlide>
                <SwiperSlide>
                    <ContentCard imageUrl={defaultImage} title="영천시장에서 <strong class='text-main'>🍧무더위를 날리는 방법</strong> 5가지!" />
                </SwiperSlide>
                <SwiperSlide>
                    <ContentCard imageUrl={defaultImage} title="영천시장에서 <strong class='text-main'>🍧무더위를 날리는 방법</strong> 5가지!" />
                </SwiperSlide>
                <SwiperSlide>
                    <ContentCard imageUrl={defaultImage} title="영천시장에서 <strong class='text-main'>🍧무더위를 날리는 방법</strong> 5가지!" />
                </SwiperSlide>
                <SwiperSlide>
                    <ContentCard imageUrl={defaultImage} title="영천시장에서 <strong class='text-main'>🍧무더위를 날리는 방법</strong> 5가지!" />
                </SwiperSlide>
            </Swiper>
            <div className="w-[calc(100vw-40px)] h-px mx-5 mt-[5px] mb-5 bg-gray-300" />
            <h1 className="text-[17px] font-medium text-black px-5">블로그 리뷰 (12)</h1>
            <Swiper
                slidesPerView={"auto"}
                spaceBetween={15}>
                <SwiperSlide>
                    <ContentCard imageUrl={defaultImage} title="영천시장에서 <strong class='text-main'>🍧무더위를 날리는 방법</strong> 5가지!" />
                </SwiperSlide>
                <SwiperSlide>
                    <ContentCard imageUrl={defaultImage} title="영천시장에서 <strong class='text-main'>🍧무더위를 날리는 방법</strong> 5가지!" />
                </SwiperSlide>
                <SwiperSlide>
                    <ContentCard imageUrl={defaultImage} title="영천시장에서 <strong class='text-main'>🍧무더위를 날리는 방법</strong> 5가지!" />
                </SwiperSlide>
                <SwiperSlide>
                    <ContentCard imageUrl={defaultImage} title="영천시장에서 <strong class='text-main'>🍧무더위를 날리는 방법</strong> 5가지!" />
                </SwiperSlide>
                <SwiperSlide>
                    <ContentCard imageUrl={defaultImage} title="영천시장에서 <strong class='text-main'>🍧무더위를 날리는 방법</strong> 5가지!" />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}