"use client";

import { useState, useEffect, useRef } from "react";
import { firebaseDatabase } from "../../../../../firebase-config";
import { ref, get } from "firebase/database";

import StoreList from "./StoreList";

import Image from "next/image";
import meatIcon from "public/icons/meat.png";
import appleIcon from "public/icons/apple.png";
import tteokIcon from "public/icons/tteok.png";
import chickenIcon from "public/icons/chicken.png";
import fishIcon from "public/icons/fish.png";
import dumplingIcon from "public/icons/dumpling.png";
import cosmeticsIcon from "public/icons/cosmetics.png";
import clothsIcon from "public/icons/cloths.png";
import restaurantIcon from "public/icons/restaurant.png";
import eggIcon from "public/icons/egg.png";
import medicineIcon from "public/icons/medicine.png";
import hotdogIcon from "public/icons/hotdog.png";
import cameraIcon from "public/icons/camera.png";
import breadIcon from "public/icons/bread.png";
import jeonIcon from "public/icons/jeon.png";
import dogIcon from "public/icons/dog.png";
import shoesIcon from "public/icons/shoes.png";
import insamIcon from "public/icons/insam.png";
import tteokbokkiIcon from "public/icons/tteokbokki.png";
import blanketIcon from "public/icons/blanket.png";
import riceIcon from "public/icons/rice.png";

export default function StoreTab({ marketKey, setSelectedStore }) {
    const [stores, setStores] = useState(null);   // 목록에 표시될 상점들의 key 
    const [category, setCategory] = useState("");
    const windowHeight = window.innerHeight;
    const allStores = useRef([]);

    const tags = [
        [meatIcon, "고기"],
        [appleIcon, "야채·과일"],
        [tteokIcon, "떡"],
        [chickenIcon, "치킨"],
        [fishIcon, "생선"],
        [dumplingIcon, "만두"],
        [cosmeticsIcon, "화장품"],
        [clothsIcon, "옷"],
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
    ]

    const storeNumberRef = ref(firebaseDatabase, `stores/${marketKey}/storeNumber`);

    const handleDropdownClick = (item) => {
        console.log(item, "필터링");
        setCategory(item);
        setDropdown(false);
    };

    const onTagClick = (name) => {
        if (category === name) {
            setCategory("");
        } else {
            setCategory(name);
        }
    }

    useEffect(() => {
        if (category === "") {
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
                <h3 className="w-max text-[17px] font-medium text-black mr-3 break-keep whitespace-nowrap">상품 종류</h3>
                <div id="tag-container" className="flex flex-row flex-nowrap whitespace-nowrap overflow-x-scroll">
                    {tags.map((content, index) => (
                        <div
                            key={index}
                            onClick={() => onTagClick(content[1])}
                            className={`w-max pl-2 pr-2.5 py-1.5 rounded-full ${content[1] === category ? "bg-main border-main text-white" : "bg-white border-black text-black"} border mr-2 flex-none flex flex-row items-center`}>
                            <Image src={content[0]} width={20} height={20} alt="아이콘" />
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
                <div>Loading {stores}</div>
            }
        </div>

    )
}