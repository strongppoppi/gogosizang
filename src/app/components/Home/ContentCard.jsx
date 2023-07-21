import Image from "next/image";
import Link from "next/link";

import defaultImage from "/public/images/defaultImage.png";

export default function ContentCard() {
  const imageStyle = {
    borderRadius: "1rem",
  };

  return (
    <Link href="/">
      <div className="flex flex-col justify-start items-center space-y-2 text-left">
        <Image
          src={defaultImage}
          width={170}
          height={170}
          alt="시장 콘텐츠 사진"
          style={imageStyle}
        />
        <h4 className="px-3 text-black font-regular tracking-tight">
          콘텐츠 글이 여기 올거야! 이게 만약 길다면?
        </h4>
      </div>
    </Link>
  );
}
