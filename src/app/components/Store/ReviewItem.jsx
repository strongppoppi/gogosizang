import Image from "next/image";

import defaultImage from "/public/images/defaultImage.png";
import starIcon from "/public/icons/star.png";
import bubble from "/public/images/speech_bubble.png";

export default function ReviewItem() {

    const tags = ["존맛탱😍", "카드가능💳"];

    return (
        <div className="w-full flex flex-col items-center mb-2.5">
            <div className="w-11/12 h-0.5 bg-gray-200 mb-5" />
            <div className="w-full flex flex-row justify-start items-center px-8 mb-1">
                <div id="profile" className="w-[34px] h-[34px] rounded-full overflow-hidden">
                    <div className="w-full h-full bg-gray-300" />
                </div>
                <h3 className="grow text-[17px] font-medium text-black ml-2.5 mt-0.5">닉네임</h3>
            </div>
            <div className="w-full pl-[76px] flex flex-row justify-start items-center ">
                <h3 className="text-[13px] font-normal text-gray-700 leading-6">평점</h3>
                <div className="w-px h-5 bg-gray-200 mx-[5px]" />
                <Image src={starIcon} width={24} height={24} alt="아이콘" />
                <h3 className="text-[13px] font-normal text-gray-700 leading-6 ml-[3px]">4.4</h3>
            </div>
            <div className="pt-1 pb-2.5">
                <div className="w-[340px] h-6 relative">
                    <Image src={bubble} fill={true} alt="이미지" className="object-cover object-top" />
                </div>
                <div className="w-[340px] bg-gray-100 rounded-b-xl border-x border-b border-gray-300 px-3 pb-2.5 text-[15px] font-normal text-black break-all">
                    리뷰 내용 리뷰 내용 @@@@@@@@@@@@@@@@@@@@@@@@@@
                </div>
            </div>
            <div className="w-full flex flex-row justify-center">
                <div className="w-[170px] h-[166px] rounded-lg overflow-hidden relative mr-2.5">
                    <Image src={defaultImage} fill={true} alt="이미지" className="object-cover" />
                </div>
                <div className="w-[170px] h-[166px] rounded-lg overflow-hidden relative">
                    <Image src={defaultImage} fill={true} alt="이미지" className="object-cover" />
                </div>
            </div>
            <div className="w-full px-5 pt-2.5 flex flex-row justify-start items-start flex-wrap">
                {tags.map((tag, index) => (
                    <div
                        key={index}
                        className="rounded pl-2.5 pr-3 py-1.5 mr-[13px] mb-3 bg-gray-100 text-[15px] font-normal text-gray-900">
                        {tag}
                    </div>
                ))}
            </div>
        </div>
    )
}