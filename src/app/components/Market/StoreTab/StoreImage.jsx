"use client"

import { useState } from "react";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { firebaseStorage } from "../../../../../firebase-config";
import Image from "next/image";

import defaultImage from "/public/images/defaultImage.png";
import arrowIcon from "public/icons/curved_arrow_white.png";


export default function StoreImage({ marketKey, storeKey, setSelectedStore }) {
    const [image, setImage] = useState(null);

    const imageRef = ref(firebaseStorage, `stores/${marketKey}/${storeKey}`);

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
        <div className="w-11/12 h-52 rounded-lg overflow-hidden relative mb-2.5 bg-gray-200 animate-pulse" />
    );

    return (
        image ?
            <div className="w-11/12 h-52 rounded-lg overflow-hidden relative mb-2.5" >
                <Image
                    src={image}
                    placeholder="blur"
                    blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                    fill={true}
                    className="object-cover"
                    alt="상점 이미지" />
                <div className="w-11 h-11 rounded-lg bg-main absolute right-2.5 bottom-2.5 flex justify-center items-center">
                    <Image src={arrowIcon} width={24} height={24} alt="아이콘" onClick={() => setSelectedStore(storeKey)} />
                </div>
            </div> :
            skeleton
    )
}