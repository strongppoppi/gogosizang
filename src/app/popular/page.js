"use client";

import { useEffect, useState } from "react";

import { fetchRankingData } from "../constants/ranking";

import ContentHeader from "../components/Home/ContentHeader";
import fireEmoji from "public/images/emoji_fire.png";
import DetailedShopCard from "../components/Home/DetailedShopCard";

export default function Popular() {
  const [rankingData, setRankingData] = useState([]);

  useEffect(() => {
    fetchRankingData({ rankingData, setRankingData });
  }, []);

  const generateDetailedShopCard = () => {
    if (!rankingData) {
      return null;
    }

    return rankingData.map((data) => (
      <div className="w-full mb-4" key={data.storeId}>
        <DetailedShopCard
          name={data.storeName}
          market={data.marketName}
          marketKey={data.marketId}
          storeKey={data.storeId}
          rating={data.averageRating}
        />
      </div>
    ));
  };

  return (
    <div className="flex-col grow overflow-y-scroll px-4 bg-gray-100 pb-[5.625rem]">
      <ContentHeader
        headerText="오늘의 인기 상점"
        subText="나도 인기 상품 즐겨보기"
        back={true}
        emoji={fireEmoji}
      />
      {generateDetailedShopCard()}
    </div>
  );
}
