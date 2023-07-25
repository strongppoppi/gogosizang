"use client"

import { useState, useEffect } from "react";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { firebaseStorage } from "../../../../firebase-config";
import Image from "next/image";

import defaultImage from "/public/images/defaultImage.png";


export default function MarketImage({ marketKey }) {
    const [image, setImage] = useState(null);

    const imageRef = ref(firebaseStorage, `markets/${marketKey}`);

    listAll(imageRef)
        .then((res) => {
            return res.items;
        })
        .then((list) => {
            if (list.length === 0) {
                setImage(defaultImage);
            } else {
                const itemRef = list[0];
                getDownloadURL(itemRef)
                    .then((url) => {
                        setImage(url);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        })
        .catch((error) => {
            console.log(error);
        });

    // 로딩 중 보여질 UI
    var skeleton = (
        <div className="w-full h-40 relative rounded-2xl flex justify-center items-center overflow-hidden mb-4 bg-gray-200" />
    );

    return (
        <div className="w-11/12">
            {image ?
                <div className="w-full h-40 relative rounded-2xl flex justify-center items-center overflow-hidden mb-4">
                    <Image
                        src={image}
                        alt="시장 이미지"
                        fill={true}
                        className="object-cover"
                    />
                </div> :
                skeleton
            }
        </div>
    )
}