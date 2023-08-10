"use client";
import { useState, useEffect, useRef } from "react";

import markets from "public/data/markets.json";

export default function MarketMap({ setNaverMap, marketKey, selectedStore }) {
    const [marketMarker, setMarketMarker] = useState(null);
    var mapRef = useRef(null);

    useEffect(() => {
        mapRef.current = new naver.maps.Map("map", {
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
            map: mapRef.current,
            icon: {
                url: '/icons/marker_main.png',
                size: new naver.maps.Size(42, 52),
                origin: new naver.maps.Point(0, 0),
            }
        });

        setNaverMap(mapRef.current);
        setMarketMarker(marker);
    }, [setNaverMap]);

    useEffect(() => {
        if (marketMarker) {
            if (selectedStore) {
                marketMarker.setMap(null);
            } else {
                marketMarker.setMap(mapRef.current);
            }
        }
    }, [selectedStore, marketMarker]);

    return <div id="map" className="w-full h-full"></div>;
}
