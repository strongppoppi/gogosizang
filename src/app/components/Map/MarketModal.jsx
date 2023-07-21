"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

import marketicon from "public/icons/market_main.png";
import markericon from "public/icons/marker_grey.png";
import chevronright from "public/icons/chevron_right_grey.png";


export default function MarketModal({ marketIndex }) {
    const [marketData, setMarketData] = useState(null);

    useEffect(() => {
        if (!marketData) {
            const MARKET_KEY = process.env.NEXT_PUBLIC_MARKET_ID;
            const generateApiUrl = (marketIndex) => `https://proxy.cors.sh/http://api.data.go.kr/openapi/tn_pubr_public_trdit_mrkt_api?serviceKey=${MARKET_KEY}&pageNo=${marketIndex + 1}&numOfRows=1&type=json`;
            const loadData = async (apiUrl) => {
                try {
                    const res = await axios.get(apiUrl, {
                        headers: {
                            'x-cors-api-key': 'temp_8897981b5a3c25edbe0d8d042cf0b42d'
                        }
                    });
                    setMarketData(res.data.response.body.items[0]);
                } catch (error) {
                    console.log(error);
                }
            };
            loadData(generateApiUrl(marketIndex));
        }
    }, [marketIndex, marketData]);

    if (marketIndex === null) return <></>

    return (
        <Link href={`/market/${marketIndex}`}>
            <div className="w-full py-4 pl-4 pr-1 rounded-lg shadow-md flex flex-row justify-between items-center bg-white">
                {marketData ?
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-start items-center mb-1">
                            <Image src={marketicon} alt="아이콘" width={24} height={24} />
                            <h5 className="text-lg font-medium text-black ml-1">{marketData.mrktNm}</h5>
                        </div>
                        <div className="flex flex-row justify-start items-center">
                            <Image src={markericon} alt="아이콘" width={24} height={24} />
                            <h5 className="text-base font-normal text-gray-600 ml-1">{marketData.rdnmadr}</h5>
                        </div>
                    </div> :
                    <div className="h-14 flex flex-col justify-between">
                        <div className="w-40 h-6 rounded bg-gray-100" />
                        <div className="w-72 h-6 rounded bg-gray-100" />
                    </div>
                }
                <Image src={chevronright} alt="아이콘" width={42} height={42} />
            </div>
        </Link >
    );
}