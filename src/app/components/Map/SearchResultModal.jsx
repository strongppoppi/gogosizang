import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";

import marketsLocation from "/public/data/markets.json";
import icon from "/public/icons/search_grey.png";
import backIcon from "/public/icons/backIcon.png";
import pinIcon from "/public/icons/pinIcon-500.png";

export default function SearchResultModal({
  toggleSearchBar,
  setSelectedMarket,
  naverMap,
}) {
  const [searchTerm, setSearchTerm] = useState(""); // 검색값 변화 감지
  const [searchedData, setSearchedData] = useState([]); // 검색 결과 목록

  const handleResultButton = async (name) => {
    let targetKey;
    for (const key in marketsLocation) {
      if (marketsLocation[key].mrktNm === name) {
        targetKey = key;
        break;
      }
    }
    await setSelectedMarket(targetKey);
    naverMap.panTo(
      new naver.maps.LatLng(
        marketsLocation[targetKey].latitude,
        marketsLocation[targetKey].longitude
      ),
      { duration: 1500, easing: "easeInCubic" }
    );
    toggleSearchBar();
  };

  useEffect(() => {
    // 검색 결과 반환 함수
    const handleSearch = async () => {
      // 검색어가 비어있을 경우 함수를 빠르게 종료
      if (searchTerm === "") {
        return;
      }
      const data = Object.values(marketsLocation).filter((item) =>
        item.mrktNm.includes(searchTerm)
      );
      const newData = data.slice(0, 4);
      setSearchedData(newData);
    };

    handleSearch();
  }, [searchTerm]);

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-white z-10">
      <div className="flex-col grow px-4">
        <div className="mt-6">
          <button className="mb-0.5" onClick={() => toggleSearchBar()}>
            <Image src={backIcon} width={18} height={16} alt="뒤로가기 버튼" />
          </button>
        </div>
        <div className="p-3 rounded-lg shadow-md flex flex-row justify-start items-center bg-white mb-4">
          <Image src={icon} width={24} height={24} alt="아이콘" />
          <input
            className="text-[15px] font-normal text-black placeholder:text-gray-500 focus:outline-none ml-2 w-full"
            placeholder="시장명·지역으로 검색"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>
        <h4 className="px-2 text-black font-medium text-[1.1rem] mb-2">
          검색 결과
        </h4>
        <div className="w-full flex flex-col justify-center items-center">
          {searchedData.slice(0, 4).map((item, index) => (
            <button
              className="w-full"
              key={Object.keys(searchedData)[index]}
              onClick={() => handleResultButton(item.mrktNm)}
            >
              <div className="w-full flex flex-col px-2 py-3 border-b border-gray-200">
                <div className="flex flex-row justify-between items-center mb-0.5">
                  <p className="text-gray-800 text-[1.1rem] font-medium tracking-tight">
                    {item.mrktNm}
                  </p>
                  <p className="text-gray-700 text-sm font-regular tracking-tight">
                    시장
                  </p>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row space-x-0.5">
                    <Image
                      src={pinIcon}
                      width={24}
                      height={16}
                      alt="핀 아이콘"
                    />
                    <p className="text-gray-500 text-base font-regular tracking-tight whitespace-normal overflow-hidden line-clamp-1">
                      {item.rdnmadr !== "" ? item.rdnmadr : item.lnmadr}
                    </p>
                  </div>
                  <p className="text-gray-700 text-sm font-regular tracking-tight">
                    11km
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
