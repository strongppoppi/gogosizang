"use client";

import Image from "next/image";

import marketicon from "/public/icons/market_white.png";


export default function NearbyMarketBtn() {
    return (
        <div className="w-36 h-12 rounded-lg shadow-md bg-black flex justify-center items-center">
            <div className="flex flex-row">
                <Image src={marketicon} alt="아이콘" width={24} height={24} />
                <div className="text-md font-medium text-white ml-2 mr-1">가까운 시장</div>
            </div>
        </div>
    )
}