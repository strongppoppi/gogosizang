

import React, { useEffect } from 'react';
import markets from "public/data/markets.json";

export default function EntireMarketMarker({ naverMap, markers, setMarkers, setSelectedMarket }) {

    useEffect(() => {
        if (naverMap) {
            const { naver } = window;

            const getClickHandler = (k) => {
                return function () {
                    console.log("marker clicked: ", k);
                    setSelectedMarket(k);
                }
            };

            const addMarkers = (markets) => {
                var newMarkers = { ...markers };   //기존 마커 + 새로 추가할 마커 배열
                for (const [key, market] of Object.entries(markets)) {
                    var marker = new naver.maps.Marker({
                        position: new naver.maps.LatLng(market.latitude, market.longitude),
                        map: naverMap,
                        icon: {
                            content: "<img src='icons/marker_main.svg' width='31.5' height='39' alt='시장 마커' class='overflow-hidden' />",
                            size: new naver.maps.Size(31.5, 39),
                            origin: new naver.maps.Point(15.75, 0),
                        }
                    });
                    naver.maps.Event.addListener(marker, 'click', getClickHandler(key));
                    newMarkers[key] = marker;
                }
                setMarkers(newMarkers);
            };
            addMarkers(markets);  //markets.json에서 latitude, longitude 가져와서 마커 추가 (API 사용X)
        }
    }, [naverMap]);

    return (
        <>
        </>
    );
}