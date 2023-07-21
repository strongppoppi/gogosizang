"use client";

import Image from "next/image";

import icon from "/public/icons/search_grey.png"

export default function SearchBar() {

    return (
        <div className="w-11/12 p-3 rounded-lg shadow-md flex flex-row justify-start items-center bg-white absolute top-8 left-1/2 transform -translate-x-1/2">
            <Image src={icon} width={24} height={24} alt="아이콘" />
            <input className="text-base font-normal text-black ml-2" placeholder="시장명·지역으로 검색" />
        </div>
    )
}