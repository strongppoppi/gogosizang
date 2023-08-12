import Image from "next/image";

import defaultImage from "/public/images/defaultImage.png";

export default function FestivalCard({ imageUrl, title, place }) {
  const imageStyle = {
    objectFit: "cover",
  };

  return (
    <button>
      <div className="flex w-[13.75rem] flex-col justify-center items-center rounded-2xl overflow-hidden drop-shadow-md">
        <div className="relative w-full h-[13rem]">
          <Image
            src={imageUrl}
            fill
            alt="시장 콘텐츠 사진"
            style={imageStyle}
          />
        </div>
        <div className="w-full flex flex-col justify-start items-start gap-y-1 px-3 py-4 bg-white">
          <h4 className="text-black font-bold text-xl text-left">{title}</h4>
          <h6 className="text-black font-base text-sm">{place}</h6>
        </div>
      </div>
    </button>
  );
}
