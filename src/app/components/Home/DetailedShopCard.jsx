import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { getStoreImage } from "@/app/constants/storeInfo";

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

  const imageStyle = {
    objectFit: "cover",
  };

  useEffect(() => {
    getStoreImage(marketKey, storeKey, setImageUrl);
  }, []);

  return (
    <Link href="/">
      <div className="w-full flex flex-col justify-between rounded-2xl overflow-hidden mb-8 drop-shadow-md">
        <div className="relative w-full h-[11rem]">
          <Image
            src={imageUrl === null ? defaultImage : imageUrl}
            fill
            alt="인기 상점 사진"
            style={imageStyle}
            className="filter brightness-50"
          />
        </div>
        <div className="w-full flex flex-row justify-between items-center  bg-white">
          <div className="flex flex-col justify-start">
            <div className="flex flex-row justify-start items-center gap-x-4 px-3 pt-3">
              <h4 className="text-lg font-medium text-black">{name}</h4>
              <p className="text-sm font-normal text-gray-800">{market}</p>
            </div>
            <div className="flex flex-row justify-start items-center gap-x-1 px-3 pt-1 pb-3">
              <Image src={starIcon} alt="평점 아이콘" width={32} height={32} />
              <h4 className="text-xl font-bold text-black">{rating}</h4>
            </div>
          </div>
          <div className="mr-2">
            <Image src={rightIcon} alt="다음" width={32} height={32} />
          </div>
        </div>
      </div>
    </Link>
  );
}
