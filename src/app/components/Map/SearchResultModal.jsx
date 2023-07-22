import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";

import marketsLocation from "/public/data/markets.json";
import icon from "/public/icons/search_grey.png";
import backIcon from "/public/icons/backIcon.png";
import pinIcon from "/public/icons/pinIcon-500.png";

export default function SearchResultModal({ toggleSearchBar }) {
  const [searchTerm, setSearchTerm] = useState(""); // 검색값 변화 감지
  const [searchedData, setSearchedData] = useState([]); // 검색 결과 목록

  const getAddress = async (latitude, longitude) => {
    try {
      const result = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_GEO_KEY}`
      );

      const address =
        result.data.results[0]?.formatted_address || "주소 정보 없음";
      return address;
    } catch (error) {
      console.log(error);
      return "주소 정보 없음";
    }
  };

  useEffect(() => {
    // 검색 결과 반환 함수
    const handleSearch = async () => {
      // 검색어가 비어있을 경우 함수를 빠르게 종료
      if (searchTerm === "") {
        return;
      }

      const data = marketsLocation.filter((item) =>
        item.mrktNm.includes(searchTerm)
      );

      // 'getAddress' 함수를 모든 검색 결과에 대해 호출하여 주소 정보 가져 옴
      const addressPromises = data
        .slice(0, 4)
        .map((item) => getAddress(item.latitude, item.longitude));

      // 'addressPromises' 배열 내 모든 주소 정보를 가져올 때까지 기다림
      const addresses = await Promise.all(addressPromises);

      // 주소 정보를 검색 결과 데이터와 함께 처리
      const searchDataWithAddress = data.slice(0, 4).map((item, index) => ({
        ...item,
        address: addresses[index], // 주소 정보를 검색 결과 항목에 추가
      }));

      console.log("주소 포함", searchDataWithAddress);

      setSearchedData(searchDataWithAddress);
    };

    handleSearch();
  }, [searchTerm]);

  return (
    <div className="flex-col grow px-4">
      <div className="mt-6">
        <button className="mb-0.5" onClick={() => toggleSearchBar()}>
          <Image src={backIcon} width={18} height={16} alt="뒤로가기 버튼" />
        </button>
      </div>
      <div className="p-3 rounded-lg shadow-md flex flex-row justify-start items-center bg-white mb-4">
        <Image src={icon} width={24} height={24} alt="아이콘" />
        <input
          className="text-base font-normal text-black ml-2 w-full"
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
          <div
            key={index}
            className="w-full flex flex-col px-2 py-3 border-b border-gray-200"
          >
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
                <Image src={pinIcon} width={24} height={16} alt="핀 아이콘" />
                <p className="text-gray-500 text-base font-regular tracking-tight whitespace-normal overflow-hidden line-clamp-1">
                  {item.address}
                </p>
              </div>
              <p className="text-gray-700 text-sm font-regular tracking-tight">
                11km
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
