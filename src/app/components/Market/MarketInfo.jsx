"use client"

import { useEffect, useState } from "react";
import { firebaseDatabase } from "../../../../firebase-config";
import { ref, get } from "firebase/database";
import Image from "next/image";

import pinIcon from "/public/icons/pin_grey.svg";
import computerIconBlack from "/public/icons/computer_black.svg";
import computerIconGrey from "/public/icons/computer_grey.svg";
import phoneIconBlack from "/public/icons/phone_black.svg";
import phoneIconGrey from "/public/icons/phone_grey.svg";
import clockIcon from "/public/icons/clock.svg";
import carIcon from "/public/icons/car.svg";
import chevronDown from "/public/icons/chevron_down_small.svg";
import chevronUp from "/public/icons/chevron_up.svg";

import { findNearestStation } from "@/app/constants/station";


export default function MarketInfo({ marketKey }) {
    const [marketApiData, setMarketApiData] = useState(null);
    const [nearestStation, setNearestStation] = useState(null);
    const [timeClicked, setTimeClicked] = useState(false);

    const apiDataRef = ref(firebaseDatabase, `market_api/${marketKey}`);

    useEffect(() => {
        if (!marketApiData) {
            get(apiDataRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const marketData = snapshot.val();
                    const station = findNearestStation(marketData.latitude, marketData.longitude);
                    setNearestStation(station);
                    setMarketApiData(marketData);
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.log(error);
            });
        }
        // subwayColor[nearestStation.line]
    }, []);

    // 파베에서 불러오거나 따로 구해야 하는 데이터
    var openTime = "07:00";
    var closeTime = "21:00";

    // 홈페이지 주소 url 유효성 검사
    const isValidURL = (url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    };

    // 영업중/영업종료
    const isOpen = (openTime, closeTime) => {
        const now = new Date();
        const open = parseTimeString(openTime);
        const close = parseTimeString(closeTime);
        return open <= now && now <= close;
    }

    const parseTimeString = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        const date = new Date();
        date.setHours(parseInt(hours, 10));
        date.setMinutes(parseInt(minutes, 10));
        date.setSeconds(0);
        return date;
    }

    // 로딩 중 보여질 UI
    var skeleton = (
        <div className="w-11/12">
            <div className="w-40 h-8 rounded-lg bg-gray-100 mb-3" />
            <div className="w-80 h-6 rounded-lg bg-gray-100 mb-2" />
            <div className="w-64 h-6 rounded-lg bg-gray-100 mb-5" />
            <div className="w-full h-14 mb-4 flex flex-row justify-center border-y border-solid border-gray-200">
                <div className="w-px h-full bg-gray-200" />
            </div>
            <div className="h-12 flex flex-row items-center p-3 rounded-lg bg-gray-100 mb-3" />
            <div className="h-12 flex flex-row items-center p-3 rounded-lg bg-gray-100 mb-6" />
        </div>
    );

    return (
        <>
            {marketApiData ?
                <div className="w-11/12">
                    <h1 className="text-[25px] font-bold text-black mb-3">{marketApiData.mrktNm}</h1>
                    <div className="flex flex-row items-center mb-2">
                        <Image src={pinIcon} alt="아이콘" width={24} height={24} />
                        <h4 className="text-[15px] font-normal text-black ml-0.5">{marketApiData.rdnmadr || marketApiData.lnmadr}</h4>
                    </div>
                    <div className="flex flex-row items-center mb-5">
                        <div className={`h-[22px] rounded-full px-2 text-[13px] font-normal text-white leading-[22px] ml-6`} style={{ backgroundColor: nearestStation.color }}>
                            {nearestStation.line}
                        </div>
                        <h4 className="text-[13px] font-normal text-gray-700 leading-[22px] ml-[5px]">{`${nearestStation.name}역으로부터 ${nearestStation.distance.toFixed(0)}m`}</h4>
                    </div>
                    <div className="w-full h-14 mb-4 flex flex-row border-y border-solid border-gray-200">
                        {isValidURL(marketApiData.homepageUrl) ?
                            <a href={marketApiData.homepageUrl} target="_blank" rel="noopener noreferrer"
                                className="flex-1 flex justify-center items-center">
                                <div className="flex-1 flex flex-col justify-center items-center pt-1">
                                    <Image src={computerIconBlack} width={24} height={24} alt="아이콘" />
                                    <h3 className="text-[13px] font-normal text-black">홈페이지</h3>
                                </div>
                            </a> :
                            <div className="flex-1 flex flex-col justify-center items-center pt-1">
                                <Image src={computerIconGrey} width={24} height={24} alt="아이콘" />
                                <h3 className="text-13px] font-normal text-gray-300">홈페이지</h3>
                            </div>}
                        <div className="w-px h-full bg-gray-200" />
                        {marketApiData.phoneNumber !== "" ?
                            <a href={`tel:${marketApiData.phoneNumber}`} className="flex-1 flex justify-center items-center">
                                <div className="flex-1 flex flex-col justify-center items-center pt-1">
                                    <Image src={phoneIconBlack} width={24} height={24} alt="아이콘" />
                                    <h3 className="text-13px] font-normal text-black">전화</h3>
                                </div>
                            </a> :
                            <div className="flex-1 flex flex-col justify-center items-center pt-1">
                                <Image src={phoneIconGrey} width={24} height={24} alt="아이콘" />
                                <h3 className="text-13px] font-normal text-gray-300">전화</h3>
                            </div>}
                    </div>
                    <div className="h-12 flex flex-row items-center px-3 rounded-lg bg-gray-100 mb-3">
                        <Image src={clockIcon} width={24} height={24} alt="아이콘" />
                        <h3 className="text-[15px] font-normal text-black ml-2.5">영업 시간</h3>
                        <div className="w-px h-6 bg-gray-400 mx-3" />
                        <div onClick={() => setTimeClicked(!timeClicked)} className="flex flex-row items-center relative">
                            <h3 className="text-[15px] font-normal text-black mr-1">{`${openTime} - ${closeTime}`}</h3>
                            {timeClicked ?
                                <Image src={chevronUp} width={24} height={24} alt="아이콘" /> :
                                <Image src={chevronDown} width={24} height={24} alt="아이콘" />
                            }
                            {timeClicked &&
                                <div className="absolute z-[60] bottom-0 transform -translate-x-[10px] translate-y-full flex flex-col items-center w-max p-2 bg-white rounded-[10px] shadow text-[15px] text-black font-normal ">
                                    <div>월 {openTime} - {closeTime}</div>
                                    <div>화 {openTime} - {closeTime}</div>
                                    <div>수 {openTime} - {closeTime}</div>
                                    <div>목 {openTime} - {closeTime}</div>
                                    <div>금 {openTime} - {closeTime}</div>
                                    <div>토 {openTime} - {closeTime}</div>
                                    <div>일 {openTime} - {closeTime}</div>
                                </div>}
                        </div>
                        <div className="grow" />
                        {isOpen(openTime, closeTime) ?
                            <div className="rounded px-2.5 py-1 bg-positive text-[13px] font-normal text-white">영업중</div> :
                            <div className="rounded px-2.5 py-1 bg-gray-500 text-[13px] font-normal text-white">영업종료</div>
                        }
                    </div>
                    <div className="h-12 flex flex-row items-center px-3 rounded-lg bg-gray-100 mb-6">
                        <Image src={carIcon} width={24} height={24} alt="아이콘" />
                        <h3 className="text-[15px] font-normal text-black ml-2.5">주차장</h3>
                        <div className="w-px h-6 bg-gray-400 mx-3" />
                        <h3 className="text-[15px] font-normal text-black mr-1">{marketApiData.prkplceYn === "Y" ? "있음" : "없음"}</h3>
                    </div>
                </div> :
                skeleton}
        </>
    )
}