"use client"

import Image from "next/image";

import icon from "/public/icons/gps.png"


export default function MyLocationBtn() {
    return (
        <div className="w-12 h-12 rounded-lg shadow-md bg-white flex justify-center items-center">
            <Image src={icon} width={24} height={24} alt="아이콘" />
        </div>
    )
}