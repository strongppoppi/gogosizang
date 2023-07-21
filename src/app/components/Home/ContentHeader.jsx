import Link from "next/link";
import Image from "next/image";

import nextIcon from "/public/icons/nextIcon.png";

export default function ContentHeader({ headerText, subText }) {
  return (
    <div className="flex flex-col justify-start my-7">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-black font-extrabold text-[1.6rem]">
          {headerText}
        </h2>
        <Link href="/">
          <div className="flex flex-row justify-center items-center">
            <h3 className="text-gray-600 font-regular text-base">더보기</h3>
            <Image src={nextIcon} width={24} height={24} alt="더보기 버튼" />
          </div>
        </Link>
      </div>
      <h4 className="text-gray-800 font-regular text-sm">{subText}</h4>
    </div>
  );
}
