"use client";
import { useState, useEffect, useRef } from "react";

import markets from "public/data/markets.json";

export default function MarketMap({ setNaverMap, marketKey, selectedStore }) {
  const [marketMarker, setMarketMarker] = useState(null);
  var mapRef = useRef(null);

  useEffect(() => {
    mapRef.current = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(
        markets[marketKey].latitude,
        markets[marketKey].longitude
      ),
      zoom: 20,
      zoomControl: false,
      scaleControl: false,
      logoControl: false,
      mapDataControl: false,
      logoControlOptions: {
        position: naver.maps.Position.TOP_LEFT,
      },
    });

    var marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(
        markets[marketKey].latitude,
        markets[marketKey].longitude
      ),
      map: mapRef.current,
      icon: {
        content: [
          "<div class='w-max h-max overflow-visible'>",
          "<img src='/icons/marker_main.svg' width='31.5' height='39' alt='시장 마커' />",
          "</div>"
        ].join(""),
        size: new naver.maps.Size(31.5, 39),
        origin: new naver.maps.Point(15.75, 0),
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
