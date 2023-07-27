"use client"

import Image from "next/image";
import mapIcon from "/public/icons/mapIcon_white.png";

export default function MapButton() {

    const handleClick = () => {
        console.log("지도로 보기");
    };

    return (
        <button
            onClick={handleClick}
            className="w-36 h-12 rounded-lg shadow-md bg-main flex flex-row justify-center items-center absolute bottom-5 right-5"
        >
            <Image src={mapIcon} alt="아이콘" width={30} height={30} />
            <div className="text-[17px] font-medium text-white ml-2 mr-1">
                지도로 보기
            </div>
        </button>
    )
}