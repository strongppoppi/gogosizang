import { useState, useEffect } from "react";
import { firebaseDatabase } from "../../../../../firebase-config";
import { ref, get, onValue } from "firebase/database";

import StoreImage from "./StoreImage";

const tagIcon = {
    가성비: "가성비 좋아요👍🏼",
    위생적: "위생적✨",
    존맛탱: "존맛탱🍽",
    친절: "친절해요😊",
    카드가능: "카드 가능💳"
}

export default function StoreItem({ marketKey, storeKey, setSelectedStore }) {
    const [storeData, setStoreData] = useState(null);
    const [tags, setTags] = useState(null);

    const storeRef = ref(firebaseDatabase, `stores/${marketKey}/${storeKey}`);
    const tagRef = ref(firebaseDatabase, `tags/${marketKey}/${storeKey}`);

    useEffect(() => {
        if (!storeData) {
            onValue(storeRef,
                (snapshot) => {
                    if (snapshot.exists()) {
                        setStoreData(snapshot.val());
                    } else {
                        console.log("No data available");
                    }
                },
                { onlyOnce: true },
                (error) => {
                    console.log(error);
                }
            );
        }
    }, [storeKey, storeRef]);

    useEffect(() => {
        if (!tags) {
            onValue(tagRef,
                (snapshot) => {
                    if (snapshot.exists()) {
                        const tagData = snapshot.val();
                        const array = Object.keys(tagData).filter(tag => tagData[tag] > 0);
                        array.sort((a, b) => tagData[b] - tagData[a]);
                        setTags(array.slice(0, 2));
                    } else {
                        setTags([]);
                    }
                },
                { onlyOnce: true },
                (error) => {
                    console.log(error);
                }
            );
        }
    }, [storeKey, tags]);


    var skeleton = (
        <div className="w-full flex flex-col justify-start items-center py-4 animate-pulse">
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
                className="w-11/12 flex flex-col justify-start items-center pt-4 pb-5">
                <StoreImage marketKey={marketKey} storeKey={storeKey} setSelectedStore={setSelectedStore} />
                <div className="w-full flex flex-row justify-start items-center mb-2.5">
                    <h3 className="text-[21px] font-medium text-black mr-2">{storeData["점포명"]}</h3>
                    <h3 className="text-[13px] font-normal text-gray-600 leading-[13px]">{storeData["분류"]}</h3>
                </div>
                {tags &&
                    <div className="w-full flex flex-row justify-start items-center">
                        {tags.map((tag, index) => (
                            <Tag key={index}>{tagIcon[tag]}</Tag>
                        ))}
                    </div>
                }
            </div >
            :
            skeleton
    );
}

function Tag({ children }) {
    return (
        <div className="rounded px-2.5 py-1 mr-2 bg-gray-100 text-[15px] font-normal text-black">
            {children}
        </div>
    )
}