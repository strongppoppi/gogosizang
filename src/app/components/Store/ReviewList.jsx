import { useState, useEffect } from "react";
import Image from "next/image";
import { firebaseDatabase } from "../../../../firebase-config";
import { ref, get, onValue } from "firebase/database";

import starIcon from "/public/icons/star.png";
import ReviewItem from "./ReviewItem";

export default function ReviewList({ marketKey, storeKey }) {
    const [reviews, setReviews] = useState(null);
    const [tags, setTags] = useState(null);
    const [rating, setRating] = useState(null);
    const [count, setCount] = useState(0);

    const reviewRef = ref(firebaseDatabase, `reviews/${marketKey}/${storeKey}`);
    const tagRef = ref(firebaseDatabase, `tags/${marketKey}/${storeKey}`);
    const ratingRef = ref(firebaseDatabase, `rankings/${marketKey}-${storeKey}`);

    const tagEmoji = {
        카드가능: "카드가능💳",
        가성비: "가성비💰",
        위생적: "위생적✨",
        존맛탱: "존맛탱😍",
        친절: "친절☺️"
    }

    useEffect(() => {
        onValue(reviewRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const array = Object.values(data);
                    array.sort((a, b) => (b.date - a.date));
                    setReviews(array);
                } else {
                    setReviews([]);
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }, [storeKey]);

    useEffect(() => {
        get(tagRef).then((snapshot) => {
            if (snapshot.exists()) {
                var tagData = snapshot.val();
                console.log(tagData);
                var tagList = [];
                for (const tag in tagData) {
                    if (tagData[tag] > 0) tagList.push(tag)
                }
                tagList.sort((a, b) => tagData[b] - tagData[a]);
                setTags(tagList.map(tag => tagEmoji[tag]));
            } else {
                setTags([]);
            }
        }).catch((error) => {
            console.log(error);
        });
    }, [storeKey]);

    useEffect(() => {
        onValue(ratingRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    console.log(data);
                    setRating(parseFloat((data.totalStars / data.count).toFixed(1)));
                    setCount(data.count);
                } else {
                    setRating(" - ");
                    setCount(0);
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }, [storeKey]);

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full h-[10px] bg-gray-200" />
            <div className="w-full flex flex-row justify-start items-center px-5 pt-6 pb-2.5">
                <h3 className="text-[17px] font-medium text-black mr-2.5">평점</h3>
                <Image src={starIcon} width={24} height={24} alt="아이콘" className="mb-0.5" />
                <h3 className="text-[15px] font-normal text-black leading-6">{rating}</h3>
            </div>
            <h3 className="w-full text-[17px] font-medium text-black px-5 pb-5">리뷰 ({count})</h3>
            <div className="w-full flex flex-row justify-start items-start flex-wrap gap-x-3 gap-y-[9px] px-5 mb-3">
                {tags && tags.map((tag, index) => (
                    <div
                        key={index}
                        className="rounded pl-2.5 pr-3 py-1.5 bg-gray-100 text-[15px] font-normal text-gray-900">
                        {tag}
                    </div>
                ))}
            </div>
            {reviews &&
                reviews.map((review, index) => <ReviewItem key={index} review={review} />)}
        </div>
    )
}