"use client";

import { useState, useEffect, useRef } from "react";
import { firebaseDatabase } from "../../../../../firebase-config";
import { ref, get } from "firebase/database";

import StoreList from "./StoreList";

import chevronDown from "/public/icons/chevron_down_small.svg";
import chevronUp from "/public/icons/chevron_up.svg";
import Image from "next/image";

export default function StoreTab({ marketKey, setSelectedStore }) {
    const [stores, setStores] = useState(null);   // 목록에 표시될 상점들의 key 
    const [category, setCategory] = useState("전체 상품");
    const [dropdown, setDropdown] = useState(false);
    const windowHeight = window.innerHeight;
    const allStores = useRef([]);

    const storeNumberRef = ref(firebaseDatabase, `stores/${marketKey}/storeNumber`);

    const handleDropdownClick = (item) => {
        console.log(item, "필터링");
        setCategory(item);
        setDropdown(false);
    };

    useEffect(() => {
        if (category === "전체 상품") {
            setStores(allStores.current);
        } else {
            // 필터링
            setStores([]);
        }
    }, [category]);

    useEffect(() => {
        if (!stores) {
            get(storeNumberRef).then((snapshot) => {
                if (snapshot.exists()) {
                    var storeNumber = snapshot.val();
                    var fullKeys = Array.from({ length: storeNumber }, (_, index) => index + 1);
                    setStores(fullKeys);
                    allStores.current = fullKeys;
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
        <div className="w-full flex flex-col items-center" style={{ height: windowHeight - 111 }}>
            <div className="w-11/12 flex flex-row justify-start items-center pt-0.5 pb-2">
                <h3 className="text-[17px] font-medium text-black mr-4">상품 종류</h3>
                <div id="dropdown-container" className="relative">
                    <div
                        onClick={() => setDropdown(!dropdown)}
                        class="w-[113px] h-[33px] pl-3.5 pr-2 rounded-2xl border-[1px] border-gray-300 flex flex-row justify-center items-center">
                        <h3 className="text-[15px] text-black font-normal grow">
                            {category}
                        </h3>
                        {dropdown ?
                            <Image src={chevronUp} width={24} height={24} alt="아이콘" className="ml-1" /> :
                            <Image src={chevronDown} width={24} height={24} alt="아이콘" className="ml-1" />}
                    </div>
                    {dropdown &&
                        <div className="w-[113px] mt-px absolute z-50 flex flex-col bg-white rounded-xl border-[1px] border-gray-300">
                            <ul className="space-y divide-y divide-gray-200">
                                {["전체 상품", "과일", "야채", "이거", "저거"].map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleDropdownClick(item)}
                                        className="text-[15px] text-black font-normal px-2.5 py-2">
                                        {item}
                                    </div>
                                ))}
                            </ul>
                        </div>}
                </div>
            </div>
            {stores ?
                stores.length > 0 ?
                    <StoreList marketKey={marketKey} storeKeys={stores} setSelectedStore={setSelectedStore} /> :
                    <div>상점 정보 없음</div>
                :
                <div>Loading {stores}</div>
            }
        </div>

    )
}