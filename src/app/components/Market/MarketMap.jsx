"use client";
import { useEffect } from "react";

import markets from "public/data/markets.json";

export default function MarketMap({ setNaverMap, marketKey }) {

    useEffect(() => {
        var mapRef = new naver.maps.Map("map", {
            center: new naver.maps.LatLng(markets[marketKey].latitude, markets[marketKey].longitude),
            zoomControl: false,
            scaleControl: false,
            logoControl: false,
            mapDataControl: false,
            logoControlOptions: {
                position: naver.maps.Position.TOP_LEFT,
            },
        });

        var marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(markets[marketKey].latitude, markets[marketKey].longitude),
            map: mapRef,
            icon: {
                url: 'icons/marker_main.png',
                size: new naver.maps.Size(42, 52),
                origin: new naver.maps.Point(0, 0),
            }
        });

        setNaverMap(mapRef);
    }, [setNaverMap]);

    return <div id="map" className="w-full h-full"></div>;
}
