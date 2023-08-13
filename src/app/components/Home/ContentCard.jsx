import Image from "next/image";
import Link from "next/link";

import defaultImage from "/public/images/defaultImage.png";

export default function ContentCard({ bgImage, title, contentId }) {
  const imageStyle = {
    objectFit: "cover",
  };

  return (
    <Link href={`/editor/${contentId}`}>
      <div className="flex flex-col justify-start items-center text-left rounded-2xl overflow-hidden drop-shadow-md ">
        <div className="relative w-full h-[9.5rem]">
          <Image
            src={bgImage === "" ? defaultImage : bgImage}
            fill
            alt="시장 콘텐츠 사진"
            style={imageStyle}
          />
        </div>
        <div className="w-full px-2 py-2 bg-white">
          <h4 className="text-black font-regular tracking-tight">
            <span
              dangerouslySetInnerHTML={{ __html: title }}
              className="line-clamp-2"
            />
          </h4>
        </div>
      </div>
    </Link>
  );
}
