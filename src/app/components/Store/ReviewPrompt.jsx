"use client"

import { useState } from "react";
import Image from "next/image";
import yellowStar from "public/icons/star_yellow.svg";
import greyStar from "public/icons/star_grey.svg";

export default function ReviewPrompt({ setFirstRating }) {
    const [rating, setRating] = useState(0);

    return (
        <div className="w-full flex justify-center">
            <div
                className="w-11/12 h-[82px] mb-5 flex flex-col justify-around items-center border-y border-solid border-gray-200 p-2.5">
                <h3 className="text-[15px] text-black font-normal leading-[19px]">이 상점은 어떠셨나요?</h3>
                <div className="w-[161px] h-[24px] flex flex-row justify-between items-center">
                    <Image
                        src={rating >= 1 ? yellowStar : greyStar} width={25} height={24} alt="별"
                        onTouchStart={() => { setRating(1) }}
                        onMouseDown={() => { setRating(1) }}
                        onTouchEnd={() => { setRating(0) }}
                        onMouseUp={() => { setRating(0) }}
                        onClick={() => { setFirstRating(1) }} />
                    <Image
                        src={rating >= 2 ? yellowStar : greyStar} width={25} height={24} alt="별"
                        onTouchStart={() => { setRating(2) }}
                        onMouseDown={() => { setRating(2) }}
                        onTouchEnd={() => { setRating(0) }}
                        onMouseUp={() => { setRating(0) }}
                        onClick={() => { setFirstRating(2) }} />
                    <Image
                        src={rating >= 3 ? yellowStar : greyStar} width={25} height={24} alt="별"
                        onTouchStart={() => { setRating(3) }}
                        onMouseDown={() => { setRating(3) }}
                        onTouchEnd={() => { setRating(0) }}
                        onMouseUp={() => { setRating(0) }}
                        onClick={() => { setFirstRating(3) }} />
                    <Image
                        src={rating >= 4 ? yellowStar : greyStar} width={25} height={24} alt="별"
                        onTouchStart={() => { setRating(4) }}
                        onMouseDown={() => { setRating(4) }}
                        onTouchEnd={() => { setRating(0) }}
                        onMouseUp={() => { setRating(0) }}
                        onClick={() => { setFirstRating(4) }} />
                    <Image
                        src={rating >= 5 ? yellowStar : greyStar} width={25} height={24} alt="별"
                        onTouchStart={() => { setRating(5) }}
                        onMouseDown={() => { setRating(5) }}
                        onTouchEnd={() => { setRating(0) }}
                        onMouseUp={() => { setRating(0) }}
                        onClick={() => { setFirstRating(5) }} />
                </div>
            </div>
        </div>
    )
}
