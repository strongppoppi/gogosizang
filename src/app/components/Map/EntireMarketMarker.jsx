

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
                console.log("addMarkers");
                var newMarkers = { ...markers };   //기존 마커 + 새로 추가할 마커 배열
                for (const [key, market] of Object.entries(markets)) {
                    var marker = new naver.maps.Marker({
                        position: new naver.maps.LatLng(market.latitude, market.longitude),
                        map: naverMap,
                        icon: {
                            url: 'icons/marker_main.png',
                            size: new naver.maps.Size(42, 52),
                            origin: new naver.maps.Point(0, 0),
                        }
                    });
                    naver.maps.Event.addListener(marker, 'click', getClickHandler(key));
                    newMarkers[key] = marker;
                }
                setMarkers(newMarkers);
                console.log(newMarkers);
            };
            addMarkers(markets);  //markets.json에서 latitude, longitude 가져와서 마커 추가 (API 사용X)
        }
    }, [naverMap]);

    return (
        <>
        </>
    );
}