import ContentCard from "./ContentCard";

export default function MarketContents() {
    return (
        <div className="w-full bg-gray-100 pt-[25px] pb-[25px]">
            <h1 className="text-[17px] font-normal text-black px-5">이 시장에 포함된 큐레이팅 (4)</h1>
            <ContentCard />
            <h1 className="text-[17px] font-normal text-black px-5">놀거리 / 즐길거리 (2)</h1>
            <h1 className="text-[17px] font-normal text-black px-5">블로그 리뷰 (12)</h1>
        </div>
    )
}