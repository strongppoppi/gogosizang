import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { getStoreImage } from "@/app/constants/storeInfo";
import { getTag } from "@/app/constants/tag";

import defaultImage from "/public/images/defaultImage.png";
import starIcon from "/public/icons/starIcon.png";
import rightIcon from "/public/icons/chevron_right_grey.png";

export default function DetailedShopCard({
  name,
  market,
  marketKey,
  storeKey,
  rating,
}) {
  const [imageUrl, setImageUrl] = useState(null);
  const [tagData, setTagData] = useState(null);

  // 이미지 스타일: cover; 채우면서, 자르기
  const imageStyle = {
    objectFit: "cover",
  };

  // 평점 반올림 소숫점 한 자리수까지
  const roundedRating = Math.round(rating * 10) / 10;

  useEffect(() => {
    getStoreImage(marketKey, storeKey, setImageUrl);
    getTag(marketKey, storeKey, setTagData);
  }, []);

  return (
    <Link href={`/market/${marketKey}`}>
      <div className="w-full flex flex-col justify-between rounded-2xl overflow-hidden mb-8 drop-shadow-md">
        <div className="relative w-full h-[11rem]">
          <Image
            src={imageUrl === null ? defaultImage : imageUrl}
            fill
            alt="인기 상점 사진"
            style={imageStyle}
          />
        </div>
        <div className="w-full flex flex-row justify-between items-center bg-white">
          <div className="flex flex-col justify-start">
            <div className="flex flex-row justify-start items-center gap-x-4 px-4 pt-3">
              <h4 className="text-lg font-medium text-black">{name}</h4>
              <p className="text-sm font-normal text-black">{market}</p>
            </div>
            <div className="flex flex-row justify-start items-center gap-x-4 px-4 pt-1 pb-3">
              <div className="flex flex-row justify-start items-center gap-x-1">
                <Image
                  src={starIcon}
                  alt="평점 아이콘"
                  width={32}
                  height={32}
                />
                <h4 className="text-xl font-bold text-black">
                  {roundedRating}
                </h4>
              </div>
              <div className="flex flex-row justify-start items-center gap-x-1">
                {tagData && tagData[0] && (
                  <div className="px-2 py-1 rounded-lg bg-gray-100">
                    <span className="text-gray-900 font-normal">
                      {tagData[0]}
                    </span>
                  </div>
                )}
                {tagData && tagData[1] && (
                  <div className="px-2 py-1 rounded-lg bg-gray-100">
                    <span className="text-gray-900 font-normal">
                      {tagData[1]}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mr-4">
            <Image src={rightIcon} alt="다음" width={32} height={32} />
          </div>
        </div>
      </div>
    </Link>
  );
}
