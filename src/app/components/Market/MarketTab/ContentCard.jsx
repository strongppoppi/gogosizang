import Image from "next/image";

import defaultImage from "/public/images/defaultImage.png";

export default function ContentCard() {

    return (
        <div className="w-[195px] h-[220px] rounded-[20px] bg-white overflow-hidden" style={{ boxShadow: "0px 3px 8px 0px rgba(143, 149, 162, 0.25)" }}>
            <div className="w-[195px] h-[162px] relative">
                <Image src={defaultImage} fill={true} alt="콘텐츠 사진" className="object-cover" />
            </div>
            <h3 className="px-[11px] py-2.5 text-[15px] font-normal text-black leading-[19px] tracking-tight">
                영천시장에서
                <span className="text-[15px] font-bold text-main mx-1">🍧무더위를 날리는 방법</span>
                5가지!
            </h3>
        </div>
    )
}