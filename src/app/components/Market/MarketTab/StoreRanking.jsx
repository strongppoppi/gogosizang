
import Image from "next/image";

import chevronDown from "/public/icons/chevron_down_small.svg";

export default function StoreRanking() {
    // 파베에서 불러온 데이터로 변경 예정
    var rankingData = [
        { "점포명": "갈현동할머니 떡볶이", "분류": "분식" },
        { "점포명": "갈현동할머니 떡볶이", "분류": "분식" },
        { "점포명": "갈현동할머니 떡볶이", "분류": "분식" },
        { "점포명": "갈현동할머니 떡볶이", "분류": "분식" },
        { "점포명": "갈현동할머니 떡볶이", "분류": "분식" },
    ];

    return (
        <div className="w-11/12 flex flex-col items-center">
            <h1 className="w-full text-lg font-medium text-black mb-2">인기 상점 Top 10</h1>
            {rankingData.map((store, index) => <StoreItem key={index} num={index + 1} storeName={store["점포명"]} category={store["분류"]} />)}
            <div className="flex flex-row items-center">
                <h1 className="text-sm font-normal text-gray-600">더보기</h1>
                <Image src={chevronDown} width={24} height={24} alt="아이콘" />
            </div>
        </div>
    )
}

function StoreItem({ num, storeName, category }) {
    return (
        <div className="w-full h-12 rounded-lg bg-gray-100 flex flex-row items-center mb-2">
            <h1 className="text-xl font-medium text-gray-500 ml-4">{num}</h1>
            <h1 className="text-base font-normal text-black grow mx-5">{storeName}</h1>
            <h1 className="text-sm font-normal text-gray-600 mr-4">{category}</h1>
        </div>
    )
}