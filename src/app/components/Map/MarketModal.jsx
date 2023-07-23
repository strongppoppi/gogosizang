"use client"

import Image from "next/image";
import Link from "next/link";

import marketsData from "public/data/markets.json";
import marketicon from "public/icons/market_main.png";
import markericon from "public/icons/marker_grey.png";
import chevronright from "public/icons/chevron_right_grey.png";


export default function MarketModal({ marketKey }) {

    if (marketKey === null) return <></>

    var marketData = marketsData[marketKey];

    return (
        <Link href={`/market/${marketKey}`}>
            <div className="w-full py-4 pl-4 pr-1 rounded-lg shadow-md flex flex-row justify-between items-center bg-white">
                <div className="flex flex-col">
                    <div className="flex flex-row justify-start items-center mb-1">
                        <Image src={marketicon} alt="아이콘" width={24} height={24} />
                        <h5 className="text-lg font-medium text-black ml-1">{marketData.mrktNm}</h5>
                    </div>
                    <div className="flex flex-row justify-start items-center">
                        <Image src={markericon} alt="아이콘" width={24} height={24} />
                        <h5 className="text-base font-normal text-gray-600 ml-1">{marketData.rdnmadr || marketData.lnmadr}</h5>
                    </div>
                </div>
                <Image src={chevronright} alt="아이콘" width={42} height={42} />
            </div>
        </Link >
    );
}