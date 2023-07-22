"use client"

import { useState } from "react";

export default function InfoTab({ children }) {
    const [leftTab, setLeftTab] = useState(true);

    const onLeftTabClick = () => {
        if (!leftTab) setLeftTab(true);
    };

    const onRightTabClick = () => {
        if (leftTab) setLeftTab(false);
    };

    return (
        <>
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
            <div className="w-full bg-white" style={{ boxShadow: '0px -1px 10px rgba(17, 18, 19, 0.1)' }}>
                {children}
            </div>
        </>
    )
}


function ActiveTab({ children, onClick }) {
    return (
        <div
            onClick={onClick}
            className="h-11 grow rounded-t-2xl z-10 flex justify-center items-center bg-white text-lg font-medium text-black pt-1.5"
            style={{ boxShadow: '0px -3px 5px rgba(17, 18, 19, 0.1)' }}>
            {children}
        </div>
    )
}


function InactiveTab({ children, onClick }) {
    return (
        <div
            onClick={onClick}
            className="h-11 grow rounded-t-2xl flex justify-center items-center bg-gray-200 text-lg font-medium text-gray-600 pt-1.5"
            style={{ boxShadow: '0px -3px 5px rgba(17, 18, 19, 0.1)' }}>
            {children}
        </div>
    )
}