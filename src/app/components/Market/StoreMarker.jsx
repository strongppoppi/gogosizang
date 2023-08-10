"use client"

import { useEffect } from "react";

import yeongcheonStores from "public/data/yeongcheonData.json";

// const iconPath = {
//     "고기": "/icons/meat.png",
//     "야채·과일": "/icons/apple.png",
//     "떡": "/icons/tteok.png",
//     "치킨": "/icons/chicken.png",
//     "생선": "/icons/fish.png",
//     "만두": "/icons/dumpling.png",
//     "화장품": "/icons/cosmetics.png",
//     "옷": "/icons/cloths.png",
//     "식당": "/icons/restaurant.png",
//     "반찬": "/icons/egg.png",
//     "약국": "/icons/medicine.png",
//     "핫도그": "/icons/hotdog.png",
//     "사진관": "/icons/camera.png",
//     "빵": "/icons/bread.png",
//     "전": "/icons/jeon.png",
//     "애견용품": "/icons/dog.png",
//     "신발": "/icons/shoes.png",
//     "약재": "/icons/insam.png",
//     "분식": "/icons/tteokbokki.png",
//     "이불": "/icons/blanket.png",
//     "잡곡": "/icons/rice.png",
//     "기타": "",
// }

export default function StoreMarker({ naverMap, markers, setMarkers, setSelectedStore }) {

    console.log("StoreMarker");

    useEffect(() => {
        if (naverMap) {
            const { naver } = window;

            const getClickHandler = (k) => {
                return function () {
                    console.log("marker clicked: ", k);
                    setSelectedStore(k);
                }
            };

            const addMarkers = (stores) => {
                console.log("addMarkers");
                var newMarkers = { ...markers };   //기존 마커 + 새로 추가할 마커 배열
                for (const [key, store] of Object.entries(stores)) {
                    if (!(Object.hasOwn(store, "위도") && Object.hasOwn(store, "경도"))) continue;
                    var marker = new naver.maps.Marker({
                        position: new naver.maps.LatLng(store["위도"], store["경도"]),
                        // map: naverMap,
                        // icon: {
                        //     content: [
                        //         '<div class="w-max h-[30px] bg-white rounded-lg border border-gray-300 flex flex-row items-center px-[7px]" shadow overflow-hidden>',
                        //         `<img src='${iconPath[store["분류"]]}' width='20' height='20' alt="상점 아이콘" />`,
                        //         `<span class="text-[13px] text-black font-normal whitespace-pre break-keep ml-1">${store["점포명"]}</span>`,
                        //         '</div>',
                        //     ].join(''),
                        // }
                    });
                    naver.maps.Event.addListener(marker, 'click', getClickHandler(key));
                    newMarkers[key] = marker;
                }
                setMarkers(newMarkers);
            };

            // 로컬/파베에서 상점 키&좌표 불러오기
            addMarkers(yeongcheonStores);
        }
    }, [naverMap]);


    return (
        <></>
    );
}