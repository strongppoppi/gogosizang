"use client";

import { useState, useEffect } from "react";
import { firebaseDatabase } from "../../../../../firebase-config";
import { ref, get } from "firebase/database";

import StoreList from "./StoreList";

export default function StoreTab({ marketKey }) {
    const [stores, setStores] = useState(null);   // 목록에 표시될 상점들의 key 
    const windowHeight = window.innerHeight;

    const storeNumberRef = ref(firebaseDatabase, `stores/${marketKey}/storeNumber`);

    useEffect(() => {
        if (!stores) {
            get(storeNumberRef).then((snapshot) => {
                if (snapshot.exists()) {
                    var storeNumber = snapshot.val();
                    var fullKeys = Array.from({ length: storeNumber }, (_, index) => index + 1);
                    setStores(fullKeys);
                } else {
                    console.log("상점 정보 없음");
                    setStores([]);
                }
            }).catch((error) => {
                console.log(error);
                setStores([]);
            });
        }
    }, []);


    return (
        <div className="w-full flex flex-col items-center" style={{ height: windowHeight - 96 }}>
            <div className="w-11/12 flex flex-row justify-start items-center">
                <h3 className="text-base font-medium text-black">상품 종류</h3>
            </div>
            {stores ?
                stores.length > 0 ?
                    <StoreList marketKey={marketKey} storeKeys={stores} /> :
                    <div>상점 정보 없음</div>
                :
                <div>Loading {stores}</div>
            }
        </div>

    )
}