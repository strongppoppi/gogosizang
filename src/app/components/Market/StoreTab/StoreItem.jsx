import Image from "next/image";

import defaultImage from "public/images/defaultImage.png";
import arrowIcon from "public/icons/curved_arrow_white.svg";

export default function StoreItem({ marketKey, storeKey }) {

    var skeleton = (
        <div className="w-full flex flex-col justify-start items-center my-4">
            <div className="w-11/12 h-52 rounded-lg overflow-hidden relative mb-2.5 bg-gray-100" />
            <div className="w-11/12 flex flex-row justify-start items-center mb-2.5">
                <div className="w-48 h-7 rounded-lg bg-gray-100" />
            </div>
            <div className="w-11/12 flex flex-row justify-start items-center">
                <div className="w-14 h-8 rounded-lg mr-2 bg-gray-100" />
                <div className="w-20 h-8 rounded-lg mr-2 bg-gray-100" />
                <div className="w-16 h-8 rounded-lg bg-gray-100" />
            </div>
        </div>
    );

    return (
        <div className="w-full flex flex-col justify-start items-center my-4">
            <div className="w-11/12 h-52 rounded-lg overflow-hidden relative mb-2.5">
                <Image src={defaultImage} fill={true} className="object-cover" alt="상점 사진" />
                <div className="w-11 h-11 rounded-lg bg-main absolute right-2.5 bottom-2.5 flex justify-center items-center">
                    <Image src={arrowIcon} width={24} height={24} alt="아이콘" />
                </div>
            </div>
            <div className="w-11/12 flex flex-row justify-start items-center mb-2.5">
                <h3 className="text-xl font-medium text-black mr-2">우리 농산물</h3>
                <h3 className="text-xs font-normal text-gray-600">야채·과일</h3>
            </div>
            <div className="w-11/12 flex flex-row justify-start items-center">
                <Tag>맛있어요</Tag>
                <Tag>가성비 좋아요</Tag>
            </div>
        </div>
    );
}

function Tag({ children }) {
    return (
        <div className="rounded px-2.5 py-1 mr-2 bg-gray-200 text-base font-normal text-black">
            {children}
        </div>
    )
}