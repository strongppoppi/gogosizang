import Image from "next/image";
import defaultImage from "/public/images/defaultImage.png";
import marketIcon from "/public/icons/market_main.png";
import markerIcon from "/public/icons/marker_grey.png";

export default function CurationItem({ storeId, imageOne, imageTwo, content }) {
  return (
    <div className="w-full flex flex-col mb-5 px-5">
      <div className="w-[360px] h-px bg-gray-200 mb-4" />
      <div className="flex flex-row items-center space-x-2 mb-1.5">
        <Image src={marketIcon} width={24} height={24} alt="아이콘" />
        <h1 className="text-lg font-medium text-black">갈현동할머니 떡볶이</h1>
        <h5 className="text-[13px] font-normal text-gray-500">분식</h5>
      </div>
      <div className="flex flex-row items-center space-x-2 mb-5">
        <Image src={markerIcon} alt="아이콘" width={24} height={24} />
        <h4 className="text-[15px] font-normal text-gray-600 ml-0.5">
          서울특별시 서대문구 어디고 저기고 여기
        </h4>
      </div>
      <div className="w-full flex flex-row justify-between">
        <div className="w-[170px] h-[166px] rounded-lg overflow-hidden relative">
          <Image
            src={defaultImage}
            fill={true}
            alt="이미지"
            className="object-cover"
          />
        </div>
        <div className="w-[170px] h-[166px] rounded-lg overflow-hidden relative">
          <Image
            src={defaultImage}
            fill={true}
            alt="이미지"
            className="object-cover"
          />
        </div>
      </div>
      <div className="text-[15px] font-normal text-black mt-4">{content}</div>
    </div>
  );
}
