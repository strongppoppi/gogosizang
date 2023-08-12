"use client";

import { useState, useEffect, useRef } from "react";
import { firebaseDatabase } from "../../../../../firebase-config";
import { ref, get, onValue } from "firebase/database";

import StoreList from "./StoreList";

import Image from "next/image";
import meatIcon from "/public/icons/meat.svg";
import appleIcon from "/public/icons/apple.svg";
import tteokIcon from "/public/icons/tteok.svg";
import chickenIcon from "/public/icons/chicken.svg";
import fishIcon from "/public/icons/fish.svg";
import dumplingIcon from "/public/icons/dumpling.svg";
import cosmeticsIcon from "/public/icons/cosmetics.svg";
import clothesIcon from "/public/icons/clothes.svg";
import restaurantIcon from "/public/icons/restaurant.svg";
import eggIcon from "/public/icons/egg.svg";
import medicineIcon from "/public/icons/medicine.svg";
import hotdogIcon from "/public/icons/hotdog.svg";
import cameraIcon from "/public/icons/camera.svg";
import breadIcon from "/public/icons/bread.svg";
import jeonIcon from "/public/icons/jeon.svg";
import dogIcon from "/public/icons/dog.svg";
import shoesIcon from "/public/icons/shoes.svg";
import insamIcon from "/public/icons/insam.svg";
import tteokbokkiIcon from "/public/icons/tteokbokki.svg";
import blanketIcon from "/public/icons/blanket.svg";
import riceIcon from "/public/icons/rice.svg";

export default function StoreTab({ marketKey, setSelectedStore }) {
    const [stores, setStores] = useState(null);   // 목록에 표시될 상점들의 key 
    const [category, setCategory] = useState("전체");
    const [categoryList, setCategoryList] = useState(null);     // { 분류: [상점키1, 상점키2, ...] }

    const tags = [
        [meatIcon, "고기"],
        [appleIcon, "야채·과일"],
        [tteokIcon, "떡"],
        [chickenIcon, "치킨"],
        [fishIcon, "생선"],
        [dumplingIcon, "만두"],
        [cosmeticsIcon, "화장품"],
        [clothesIcon, "옷"],
        [restaurantIcon, "식당"],
        [eggIcon, "반찬"],
        [medicineIcon, "약국"],
        [hotdogIcon, "핫도그"],
        [cameraIcon, "사진관"],
        [breadIcon, "빵"],
        [jeonIcon, "전"],
        [dogIcon, "애견용품"],
        [shoesIcon, "신발"],
        [insamIcon, "약재"],
        [tteokbokkiIcon, "분식"],
        [blanketIcon, "이불"],
        [riceIcon, "잡곡"],
        [null, "기타"]
    ]

    const categoryRef = ref(firebaseDatabase, `stores/${marketKey}/category`);

    useEffect(() => {
        if (!categoryList) {
            // get(categoryRef).then((snapshot) => {
            //     if (snapshot.exists()) {
            //         var categories = snapshot.val();
            //         setStores(Object.values(categories["전체"]));
            //         setCategoryList(categories);
            //     } else {
            //         console.log("카테고리 정보 없음");
            //         setStores([]);
            //     }
            // }).catch((error) => {
            //     console.log(error);
            //     setStores([]);
            // });

            onValue(categoryRef,
                (snapshot) => {
                    if (snapshot.exists()) {
                        var categories = snapshot.val();
                        setStores(categories["전체"]);
                        setCategoryList(categories);
                    } else {
                        console.log("카테고리 정보 없음");
                        setStores([]);
                    }
                },
                { onlyOnce: true },
                (error) => {
                    console.log(error);
                }
            );
        }
    }, []);

    const onTagClick = (name) => {
        if (category === name) {
            setCategory("전체");
        } else {
            setCategory(name);
        }
    }

    useEffect(() => {
        if (categoryList) {
            console.log("분류:", category, categoryList[category]);
            var newStores = categoryList[category];
            setStores(newStores);
        }
    }, [category]);


    return (
        <div className="w-full flex flex-col items-center h-[calc(100vh-111px)]">
            <div className="w-11/12 flex flex-row justify-start items-center pt-0.5 pb-2">
                <h3 className="w-max text-[17px] font-medium text-black mr-3 break-keep whitespace-nowrap">상품 종류</h3>
                <div id="tag-container" className="flex flex-row flex-nowrap whitespace-nowrap overflow-x-scroll scroll-px-px scroll-pb-px" style={{ scrollbarWidth: 'thin' }}>
                    {tags.map((content, index) => (
                        <div
                            key={index}
                            onClick={() => onTagClick(content[1])}
                            className={`w-max px-2.5 py-1.5 rounded-full ${content[1] === category ? "bg-main border-main text-white" : "bg-white border-black text-black"} border mr-2 flex-none flex flex-row items-center box-border`}>
                            {content[0] && <Image src={content[0]} width={20} height={20} alt="아이콘" />}
                            <h3 className="text-[15px] font-normal ml-1">{content[1]}</h3>
                        </div>
                    ))}
                </div>
            </div>
            {stores ?
                stores.length > 0 ?
                    <StoreList marketKey={marketKey} storeKeys={stores} setSelectedStore={setSelectedStore} /> :
                    <div>상점 정보 없음</div>
                :
                <div>Loading</div>
            }
        </div>
    )
}