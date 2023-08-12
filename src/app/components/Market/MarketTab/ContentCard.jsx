import Image from "next/image";

import defaultImage from "/public/images/defaultImage.png";

export default function ContentCard({ imageUrl, title }) {

    return (
        <div className="w-[195px] h-[220px] rounded-[20px] bg-white overflow-hidden" style={{ boxShadow: "0px 3px 8px 0px rgba(143, 149, 162, 0.25)" }}>
            <div className="w-[195px] h-[162px] relative">
                <Image src={imageUrl} fill={true} alt="콘텐츠 사진" className="object-cover" />
            </div>
            <h3 className="px-[11px] py-2.5 text-[15px] font-normal text-black leading-[19px] tracking-tight">
                <span dangerouslySetInnerHTML={{ __html: title }} />
            </h3>
        </div>
    )
}