"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import defaultImage from "/public/images/defaultImage.png";
import rightIcon from "/public/icons/chevron_right_grey.png";

export default function DetailedContentCard({}) {
  const [imageUrl, setImageUrl] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);

  const imageStyle = {
    objectFit: "cover",
  };

  useEffect(() => {}, []);

  return (
    <Link href={`/`}>
      <div className="w-full flex flex-col justify-between rounded-2xl overflow-hidden mb-8 drop-shadow-md">
        <div className="relative w-full h-[11rem]">
          <Image
            src={imageUrl === null ? defaultImage : imageUrl}
            fill
            alt="인기 상점 사진"
            style={imageStyle}
          />
        </div>
        <div className="w-full flex flex-row justify-between items-center bg-white">
          <div className="flex flex-col justify-start gap-y-1 px-4 py-3">
            <div className="flex flex-row justify-start items-center">
              <h4 className="text-lg font-medium text-black leading-6">
                요즘 힙한 사람들이 가는 을지로 시장 속 맛집은 어디?
              </h4>
            </div>
            <div className="flex flex-row justify-start items-center gap-x-2">
              <div className="relative w-[1.5rem] h-[1.5rem] rounded-[100%] overflow-hidden">
                <Image
                  src={
                    profileImageUrl === null ? defaultImage : profileImageUrl
                  }
                  fill
                  alt="프로필 사진"
                />
              </div>
              <h5 className="text-sm font-normal text-gray-600">
                가무시 에디터
              </h5>
            </div>
          </div>
          <div className="mr-3">
            <Image src={rightIcon} alt="다음" width={40} height={40} />
          </div>
        </div>
      </div>
    </Link>
  );
}
