"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

import defaultImage from "/public/images/defaultImage.png";
import markerIcon from "/public/icons/marker_grey.png";
import computerIcon from "/public/icons/computer.svg";
import phoneIcon from "/public/icons/phonecall.svg";
import clockIcon from "/public/icons/clock.svg";
import carIcon from "/public/icons/car.svg";
import chevronDown from "/public/icons/chevron_down_small.svg";
import Link from "next/link";


export default function MarketInfo({ marketIndex }) {
    const [marketData, setMarketData] = useState(null);

    // 파베에서 불러오거나 따로 구해야 하는 데이터
    var imageUrl = "";
    var subwayLine = 5;
    var station = "서대문역";
    var stationsDistance = "641m";
    var openTime = "08:00";
    var closeTime = "21:00";
    var freeParking = true;

    // 공공데이터 API
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
                    console.log(res);
                    setMarketData(res.data.response.body.items[0]);
                } catch (error) {
                    console.log(error);
                }
            };
            loadData(generateApiUrl(marketIndex));

        }
    }, [marketIndex, marketData]);

    // 홈페이지 주소 url 유효성 검사
    const isValidURL = (url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    };

    // 로딩 중 보여질 UI
    var skeleton = (
        <div className="w-full">
            Loading...
        </div>
    );


    return (
        <div className="w-90">
            {marketData ?
                <>
                    <div className="w-full h-40 rounded-xl flex justify-center items-center overflow-hidden mb-4">
                        <Image
                            src={defaultImage}
                            alt="시장 이미지"
                            width={350}
                            height={160}
                        />
                    </div>
                    <h1 className="text-2xl font-bold text-black mb-3">{marketData.mrktNm}</h1>
                    <div className="flex flex-row items-center mb-2">
                        <Image src={markerIcon} alt="아이콘" width={24} height={24} />
                        <h4 className="text-base font-normal text-black ml-0.5">{marketData.rdnmadr}</h4>
                    </div>
                    <div className="flex flex-row items-center mb-5">
                        <div className="rounded-full px-2 py-0.5 bg-main text-sm font-normal text-white ml-6">
                            {`${subwayLine}호선`}
                        </div>
                        <h4 className="text-sm font-normal text-gray-700 ml-1">{`${station}(으)로부터 ${stationsDistance}`}</h4>
                    </div>
                    <div className="w-full h-14 mb-4 flex flex-row border-y border-solid border-gray-200">
                        {isValidURL(marketData.homepageUrl) ?
                            <a href={marketData.homepageUrl} target="_blank" rel="noopener noreferrer"
                                className="flex-1 flex justify-center items-center">
                                <div className="flex-1 flex flex-col justify-center items-center py-1">
                                    <Image src={computerIcon} width={24} height={24} alt="아이콘" />
                                    <h3 className="text-sm font-normal text-black">홈페이지</h3>
                                </div>
                            </a> :
                            <div className="flex-1 flex flex-col justify-center items-center py-1" style={{ opacity: 0.5 }}>
                                <Image src={computerIcon} width={24} height={24} alt="아이콘" />
                                <h3 className="text-sm font-normal text-black">홈페이지</h3>
                            </div>}
                        <div className="w-px h-full bg-gray-200" />
                        <div className="flex-1 flex flex-col justify-center items-center py-1">
                            <Image src={phoneIcon} width={24} height={24} alt="아이콘" />
                            <h3 className="text-sm font-normal text-black">전화</h3>
                        </div>
                    </div>
                    <div className="flex flex-row items-center p-3 rounded-lg bg-gray-100 mb-3">
                        <Image src={clockIcon} width={24} height={24} alt="아이콘" />
                        <h3 className="text-base font-normal text-black ml-2.5">영업 시간</h3>
                        <div className="w-px h-6 bg-gray-400 mx-3" />
                        <h3 className="text-base font-normal text-black mr-1">{`${openTime} - ${closeTime}`}</h3>
                        <Image src={chevronDown} width={24} height={24} alt="아이콘" />
                        <div className="grow" />
                        <div className="rounded px-2.5 py-1 bg-positive text-sm font-normal text-white">영업중</div>
                    </div>
                    <div className="flex flex-row items-center p-3 rounded-lg bg-gray-100">
                        <Image src={carIcon} width={24} height={24} alt="아이콘" />
                        <h3 className="text-base font-normal text-black ml-2.5">주차장</h3>
                        <div className="w-px h-6 bg-gray-400 mx-3" />
                        <h3 className="text-base font-normal text-black mr-1">{marketData.prkplceYn === "Y" ? "있음" : "없음"}</h3>
                    </div>
                </> :
                skeleton}
        </div>
    )
}