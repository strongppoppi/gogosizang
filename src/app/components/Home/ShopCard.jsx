import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { getStoreImage } from "@/app/constants/storeInfo";

import defaultImage from "/public/images/defaultImage.png";
import marketIcon from "/public/icons/marketIcon.png";
import pinIcon from "/public/icons/pinIcon.png";

export default function ShopCard({ name, market, marketKey, storeKey }) {
  const [imageUrl, setImageUrl] = useState(null);

  const imageStyle = {
    objectFit: "cover",
  };

  useEffect(() => {
    getStoreImage(marketKey, storeKey, setImageUrl);
  }, []);

  return (
    <Link href={`/market/${marketKey}`}>
      <div className="flex flex-col justify-start items-center w-[12.5rem] overflow-hidden rounded-2xl drop-shadow-md mb-1">
        <div className="relative w-full h-[8.5rem]">
          <Image
            src={imageUrl === null ? defaultImage : imageUrl}
            fill
            alt="인기 상점 사진"
            style={imageStyle}
          />
        </div>
        <div className="flex flex-col py-2.5 px-4 space-y-0.5 w-full bg-white">
          <div className="flex flex-row justify-start items-center space-x-1.5">
            <Image src={marketIcon} width={18} height={18} alt="상점 아이콘" />
            <h4 className="text-base font-medium text-black line-clamp-1">
              {name}
            </h4>
          </div>
          <div className="flex flex-row justify-start items-center space-x-1.5">
            <Image src={pinIcon} width={18} height={18} alt="상점 아이콘" />
            <p className="text-sm text-black">{market}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
