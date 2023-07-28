import { useState, useEffect } from "react";
import { firebaseDatabase } from "../../../../../firebase-config";
import { ref, get } from "firebase/database";

import StoreImage from "./StoreImage";
import Link from "next/link";

export default function StoreItem({ marketKey, storeKey, setSelectedStore }) {
    const [storeData, setStoreData] = useState(null);

    const storeRef = ref(firebaseDatabase, `stores/${marketKey}/${storeKey}`);

    useEffect(() => {
        // database
        if (!storeData) {
            get(storeRef).then((snapshot) => {
                if (snapshot.exists()) {
                    setStoreData(snapshot.val());
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }, []);

    var skeleton = (
        <div className="w-full flex flex-col justify-start items-center my-4 animate-pulse">
            <div className="w-11/12 h-52 rounded-lg overflow-hidden relative mb-2.5 bg-gray-200" />
            <div className="w-11/12 flex flex-row justify-start items-center mb-2.5">
                <div className="w-48 h-7 rounded-lg bg-gray-200" />
            </div>
            <div className="w-11/12 flex flex-row justify-start items-center">
                <div className="w-14 h-8 rounded-lg mr-2 bg-gray-200" />
                <div className="w-20 h-8 rounded-lg mr-2 bg-gray-200" />
                <div className="w-16 h-8 rounded-lg bg-gray-200" />
            </div>
        </div>
    );


    return (
        storeData ?
            <div
                className="w-full flex flex-col justify-start items-center my-4">
                <StoreImage marketKey={marketKey} storeKey={storeKey} setSelectedStore={setSelectedStore} />
                <div className="w-11/12 flex flex-row justify-start items-center mb-2.5">
                    <h3 className="text-[21px] font-medium text-black mr-2">{storeData["점포명"]}</h3>
                    <h3 className="text-[13px] font-normal text-gray-600 leading-[13px]">{storeData["취급품목"]}</h3>
                </div>
                <div className="w-11/12 flex flex-row justify-start items-center">
                    <Tag>맛있어요</Tag>
                    <Tag>가성비 좋아요</Tag>
                </div>
            </div >
            :
            skeleton
    );
}

function Tag({ children }) {
    return (
        <div className="rounded px-2.5 py-1 mr-2 bg-gray-200 text-[15px] font-normal text-black">
            {children}
        </div>
    )
}