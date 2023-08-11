"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import home_grey from "/public/icons/homeIcon_grey.png";
import home_white from "/public/icons/homeIcon_white.png";
import map_grey from "/public/icons/mapIcon_grey.png";
import map_white from "/public/icons/mapIcon_white.png";
import setting_grey from "/public/icons/settingIcon_grey.png";
import setting_white from "/public/icons/settingIcon_white.png";

export default function BottomTab() {
  const pathName = usePathname();

  return (
    <div className="absolute bottom-[-90px] left-0 w-full bg-white z-20 h-[180px]">
      <footer>
        <div className="flex flex-row justify-around border-t-2 py-4">
          <Link href="/" className="grow justify-center items-center">
            <div className="flex-col justify-center items-center text-center space-y-1">
              <div
                className={`${
                  pathName === "/" ? "bg-main" : "bg-white"
                } px-4 py-0.5 inline-flex align-middle rounded-lg`}
              >
                <Image
                  src={pathName === "/" ? home_white : home_grey}
                  width={25}
                  height={25}
                  alt="홈 아이콘"
                  className="mx-auto"
                />
              </div>
              <h4
                className={`${
                  pathName === "/" ? "text-black" : "text-gray-500"
                } text-base font-regular tracking-tight`}
              >
                홈
              </h4>
            </div>
          </Link>
          <Link href="/map" className="grow justify-center items-center">
            <div className="flex-col justify-center items-center text-center space-y-1">
              <div
                className={`${
                  pathName === "/map" ? "bg-main" : "bg-white"
                } px-4 py-0.5 inline-flex align-middle rounded-lg`}
              >
                <Image
                  src={pathName === "/map" ? map_white : map_grey}
                  width={25}
                  height={25}
                  alt="시장찾기 아이콘"
                  className="mx-auto"
                />
              </div>
              <h4
                className={`${
                  pathName === "/map" ? "text-black" : "text-gray-500"
                } text-base font-regular tracking-tight`}
              >
                시장찾기
              </h4>
            </div>
          </Link>
          <Link href="/mypage" className="grow justify-center items-center">
            <div className="flex-col justify-center items-center text-center space-y-1">
              <div
                className={`${
                  pathName === "/mypage" ? "bg-main" : "bg-white"
                } px-4 py-0.5 inline-flex align-middle rounded-lg`}
              >
                <Image
                  src={pathName === "/mypage" ? setting_white : setting_grey}
                  width={25}
                  height={25}
                  alt="설정 아이콘"
                  className="mx-auto"
                />
              </div>
              <h4
                className={`${
                  pathName === "/mypage" ? "text-black" : "text-gray-500"
                } text-base font-regular tracking-tight`}
              >
                설정
              </h4>
            </div>
          </Link>
        </div>
      </footer>
    </div>
  );
}
