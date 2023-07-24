"use client"

import { useState } from "react";

import MarketTab from "./MarketTab/MarketTab";
import StoreTab from "./StoreTab/StoreTab";


export default function InfoTab({ marketKey }) {
    const [leftTab, setLeftTab] = useState(true);

    const onLeftTabClick = () => {
        if (!leftTab) setLeftTab(true);
    };

    const onRightTabClick = () => {
        if (leftTab) setLeftTab(false);
    };

    return (
        <div className="w-full h-auto flex flex-col justify-start items-center">
            <div className="w-full flex flex-row bg-white">
                {leftTab ?
                    <>
                        <ActiveTab onClick={onLeftTabClick}>시장 정보</ActiveTab>
                        <InactiveTab onClick={onRightTabClick}>상점 정보</InactiveTab>
                    </> :
                    <>
                        <InactiveTab onClick={onLeftTabClick}>시장 정보</InactiveTab>
                        <ActiveTab onClick={onRightTabClick}>상점 정보</ActiveTab>
                    </>}
            </div>
            <div className="w-full h-4 bg-white z-20 -mt-0.5 -mb-4" />
            <div className="w-full h-auto bg-white pt-4" style={{ boxShadow: '0px -1px 10px rgba(17, 18, 19, 0.18)' }}>
                {leftTab ?
                    <MarketTab marketKey={marketKey} /> :
                    <StoreTab marketKey={marketKey} />}
            </div>
        </div>
    )
}


function ActiveTab({ children, onClick }) {
    return (
        <div
            onClick={onClick}
            className="h-11 grow rounded-t-2xl z-10 flex justify-center items-center bg-white text-lg font-medium text-black pt-1.5"
            style={{ boxShadow: '0px -1px 10px rgba(17, 18, 19, 0.18)' }}>
            {children}
        </div>
    )
}


function InactiveTab({ children, onClick }) {
    return (
        <div
            onClick={onClick}
            className="h-11 grow rounded-t-2xl flex justify-center items-center bg-gray-200 text-lg font-medium text-gray-600 pt-1.5"
            style={{ boxShadow: '0px -1px 10px rgba(17, 18, 19, 0.18)' }}>
            {children}
        </div>
    )
}