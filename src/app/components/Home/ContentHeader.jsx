"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import nextIcon from "/public/icons/nextIcon.png";
import backIcon from "/public/icons/backIcon.png";

export default function ContentHeader({
  headerText,
  subText,
  linkPath,
  back,
  emoji,
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-start my-6">
      {!linkPath && back ? (
        <div className="mb-0.5">
          <button onClick={() => router.back()} className="">
            <Image src={backIcon} width={18} height={16} alt="뒤로가기 버튼" />
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row justify-start items-center gap-x-1">
          <Image src={emoji} width={24} height={24} alt="emoji" />
          <h2 className="text-black font-bold text-[1.35rem] tracking-tightest">
            {headerText}
          </h2>
        </div>
        {linkPath && (
          <Link href={linkPath}>
            <div className="flex flex-row justify-center items-center">
              <h3 className="text-gray-600 font-regular text-base">더보기</h3>
              <Image src={nextIcon} width={24} height={24} alt="더보기 버튼" />
            </div>
          </Link>
        )}
      </div>
      <h4 className="text-gray-800 font-regular text-sm tracking-tighter">
        {subText}
      </h4>
    </div>
  );
}
