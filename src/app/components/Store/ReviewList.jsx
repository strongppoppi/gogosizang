import { useState, useEffect } from "react";
import Image from "next/image";
import { firebaseDatabase } from "../../../../firebase-config";
import { ref, get } from "firebase/database";

import starIcon from "/public/icons/star.png";
import ReviewItem from "./ReviewItem";

export default function ReviewList({ marketKey, storeKey }) {
    const [reviews, setReviews] = useState(null);

    const reviewRef = ref(firebaseDatabase, `reviews/${marketKey}/${storeKey}`);

    useEffect(() => {
        if (!reviews) {
            get(reviewRef).then((snapshot) => {
                if (snapshot.exists()) {
                    setReviews(snapshot.val());
                } else {
                    setReviews({});
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }, []);

    const tags = ["😍 존맛탱", "💳 카드가능", "✨ 위생적", "💰 가성비"];

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full h-[10px] bg-gray-200" />
            <div className="w-full flex flex-row justify-start items-center px-5 pt-6 pb-2.5">
                <h3 className="text-[17px] font-medium text-black mr-2.5">평점</h3>
                <Image src={starIcon} width={24} height={24} alt="아이콘" className="mb-0.5" />
                <h3 className="text-[15px] font-normal text-black leading-6">4.4</h3>
            </div>
            <h3 className="w-full text-[17px] font-medium text-black px-5 pb-5">리뷰 (8)</h3>
            <div className="flex flex-row justify-start items-start flex-wrap px-5">
                {tags.map((tag, index) => (
                    <div
                        key={index}
                        className="rounded pl-2.5 pr-3 py-1.5 mr-3.5 mb-3 bg-gray-100 text-[15px] font-normal text-gray-900">
                        {tag}
                    </div>
                ))}
            </div>
            <ReviewItem />
            <ReviewItem />
        </div>
    )
}