import StoreRanking from "./StoreRanking";

export default function MarketTab({ marketKey }) {
    const windowHeight = window.innerHeight;

    return (
        <div className="w-full flex flex-col items-center" style={{ height: windowHeight - 96 }}>
            <StoreRanking />
        </div>

    )
}