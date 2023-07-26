import Image from "next/image";

import defaultImage from "/public/images/defaultImage.png";
import starIcon from "/public/icons/star.png";
import bubble from "/public/images/speech_bubble.png";

export default function ReviewItem() {
    return (
        <div className="w-full flex flex-col items-center mb-6">
            <div className="w-11/12 h-0.5 bg-gray-200 mb-5" />
            <div className="w-full flex flex-row items-center px-8 mb-1">
                <div className="w-[34px] h-[34px] rounded-full overflow-hidden">
                    <div className="w-full h-full bg-gray-300" />
                </div>
                <h3 className="grow text-[17px] font-medium text-black ml-2.5">닉네임</h3>
                <Image src={starIcon} width={24} height={24} alt="아이콘" />
                <h3 className="text-[15px] font-normal text-black leading-6">4.4</h3>
            </div>
            <div className="pb-3">
                <div className="w-[340px] h-6 relative">
                    <Image src={bubble} fill={true} alt="이미지" className="object-cover object-top" />
                </div>
                <div className="w-[340px] bg-gray-100 rounded-b-xl border-x border-b border-gray-300 px-3 pb-2.5 text-[15px] font-normal text-black break-all">
                    리뷰 내용 리뷰 내용 @@@@@@@@@@@@@@@@@@@@@@@@@@
                </div>
            </div>
            <div className="w-11/12 flex flex-row justify-between">
                <div className="w-[170px] h-[166px] rounded-lg overflow-hidden relative">
                    <Image src={defaultImage} fill={true} alt="이미지" className="object-cover" />
                </div>
                <div className="w-[170px] h-[166px] rounded-lg overflow-hidden relative">
                    <Image src={defaultImage} fill={true} alt="이미지" className="object-cover" />
                </div>
            </div>
        </div>
    )
}