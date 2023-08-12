import Image from "next/image";
import Link from "next/link";

import defaultImage from "/public/images/defaultImage.png";

export default function ContentCard() {
  const imageStyle = {
    objectFit: "cover",
  };

  return (
    <Link href="/editor/1">
      <div className="flex flex-col justify-start items-center text-left rounded-2xl overflow-hidden drop-shadow-md">
        <div className="relative w-full h-[10rem]">
          <Image
            src={defaultImage}
            fill
            alt="시장 콘텐츠 사진"
            style={imageStyle}
          />
        </div>
        <div className="px-2 py-1 bg-white">
          <h4 className="text-black font-regular tracking-tight">
            콘텐츠 글이 여기 올거야! 이게 만약 길다면?
          </h4>
        </div>
      </div>
    </Link>
  );
}
