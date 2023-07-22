import Image from "next/image";
import Link from "next/link";

import defaultImage from "/public/images/defaultImage.png";
import marketIcon from "/public/icons/marketIcon.png";
import pinIcon from "/public/icons/pinIcon.png";

export default function ShopCard({ imagePath, name, market }) {
  const imageStyle = {
    borderRadius: "1rem",
  };

  return (
    <Link href="/">
      <div className="relative">
        <Image
          src={defaultImage}
          width={225}
          height={225}
          alt="인기 상점 사진"
          style={imageStyle}
          className="filter brightness-50"
        />
        <div className="flex flex-col absolute bottom-0 left-0 py-2.5 px-4 text-black space-y-0.5">
          <div className="flex flex-row justify-start items-center space-x-1.5">
            <Image src={marketIcon} width={18} height={18} alt="상점 아이콘" />
            <h4 className="text-base font-medium text-white">{name}</h4>
          </div>
          <div className="flex flex-row justify-start items-center space-x-1.5">
            <Image src={pinIcon} width={18} height={18} alt="상점 아이콘" />
            <p className="text-sm text-gray-100">{market}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
