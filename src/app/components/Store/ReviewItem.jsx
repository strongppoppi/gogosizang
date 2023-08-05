import Image from "next/image";

import { useState, useEffect } from "react";
import { firebaseDatabase } from "../../../../firebase-config";
import { ref, onValue } from "firebase/database";
import defaultProfile from "/public/images/default_profile.png";
import starIcon from "/public/icons/star.png";
import bubble from "/public/images/speech_bubble.png";

export default function ReviewItem({ review }) {
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {

        onValue(ref(firebaseDatabase, `users/${review["userId"]}/profileImage`),
            (snapshot) => {
                if (snapshot.exists()) {
                    setProfileImage(snapshot.val());
                } else {
                    console.log("No data available");
                }
            },
            { onlyOnce: true },
            (error) => {
                console.log(error);
            }
        );
    }, []);

    // 텍스트 리뷰가 없다면 목록에 표시하지 않음
    if (review["content"] == "" && review["imageUrl"] == undefined) return;

    const tagEmoji = {
        '카드가능': '카드가능💳',
        '가성비': '가성비💰',
        '위생적': '위생적✨',
        '존맛탱': '존맛탱😍',
        '친절': '친절☺️'
    };

    return (
        <div className="w-full flex flex-col items-center mb-2.5">
            <div className="w-11/12 h-0.5 bg-gray-200 mb-5" />
            <div className="w-full flex flex-row justify-start items-center px-[26px] mb-1">
                <div id="profile" className="w-[34px] h-[34px] rounded-full overflow-hidden relative">
                    <Image src={profileImage || defaultProfile} fill={true} alt="이미지" className="object-cover" />
                </div>
                <h3 className="grow text-[17px] font-medium text-black ml-2.5 mt-0.5">{review["userId"]}</h3>
            </div>
            <div className="w-full pl-[70px] flex flex-row justify-start items-center ">
                <h3 className="text-[13px] font-normal text-gray-700 leading-6">평점</h3>
                <div className="w-px h-5 bg-gray-200 mx-[5px]" />
                <Image src={starIcon} width={24} height={24} alt="아이콘" />
                <h3 className="text-[13px] font-normal text-gray-700 leading-6 ml-[3px]">{review["rating"]}</h3>
            </div>
            {review["content"] &&
                <div className="pt-1">
                    <div className="w-[340px] h-6 relative mr-2.5">
                        <Image src={bubble} fill={true} alt="이미지" className="object-cover object-top" />
                    </div>
                    <div className="w-[340px] bg-gray-100 rounded-b-xl border-x border-b border-gray-300  mr-2.5 px-3 pb-2.5 text-[15px] font-normal text-black break-all">
                        {review["content"]}
                    </div>
                </div>}
            <div className="w-full px-5 mt-2.5 flex flex-row justify-start overflow-x-scroll space-x-2.5">
                {review["imageUrl"] != undefined &&
                    review["imageUrl"].map((url, index) => <div key={index} className="w-[170px] h-[166px] rounded-lg overflow-hidden relative shrink-0">
                        <Image src={url} fill={true} alt="이미지" className="object-cover" />
                    </div>)}
            </div>
            <div className="w-full px-5 pt-2.5 flex flex-row justify-start items-start flex-wrap">
                {review["tags"] != undefined &&
                    review["tags"].map((tag, index) => (
                        <div
                            key={index}
                            className="rounded pl-2.5 pr-3 py-1.5 mr-[13px] mb-3 bg-gray-100 text-[15px] font-normal text-gray-900">
                            {tagEmoji[tag]}
                        </div>
                    ))}
            </div>
        </div>
    )
}