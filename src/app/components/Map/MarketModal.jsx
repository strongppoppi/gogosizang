"use client"

import Image from "next/image";
import Link from "next/link";

import marketsData from "public/data/markets.json";
import marketIcon from "public/icons/market_main.svg";
import pinIcon from "public/icons/pin_grey.svg";
import chevronright from "public/icons/chevron_right_grey.png";


export default function MarketModal({ marketKey }) {

    if (marketKey === null) return <></>

    var marketData = marketsData[marketKey];

    return (
        <Link href={`/market/${marketKey}`}>
            <div className="w-11/12 absolute bottom-[174px] left-1/2 transform -translate-x-1/2 py-4 pl-4 pr-1 rounded-lg shadow flex flex-row justify-between items-center bg-white">
                <div className="flex flex-col">
                    <div className="flex flex-row justify-start items-center mb-1">
                        <Image src={marketIcon} alt="아이콘" width={24} height={24} />
                        <h5 className="text-lg font-medium text-black leading-6 ml-1">{marketData.mrktNm}</h5>
                    </div>
                    <div className="flex flex-row justify-start items-start">
                        <Image src={pinIcon} alt="아이콘" width={24} height={24} />
                        <h5 className="text-[15px] font-normal text-gray-600 ml-1">{marketData.rdnmadr || marketData.lnmadr}</h5>
                    </div>
                </div>
                <Image src={chevronright} alt="아이콘" width={42} height={42} />
            </div>
        </Link>
    );
}