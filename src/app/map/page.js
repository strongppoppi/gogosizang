import EntireMap from "../components/Map/EntireMap";
import MarketModal from "../components/Map/MarketModal";
import MyLocationBtn from "../components/Map/MyLocationBtn";
import NearbyMarketBtn from "../components/Map/NearbyMarketBtn";
import SearchBar from "../components/Map/SearchBar";

export default function MapPage() {
  return (
    <div className="flex-col grow overflow-y-scroll">
      <EntireMap />
      <SearchBar />
      <div className="w-11/12 absolute bottom-32 left-1/2 transform -translate-x-1/2 flex flex-col">
        <MarketModal marketIndex={0} />
        <div className="flex flex-row justify-between mt-4">
          <NearbyMarketBtn />
          <MyLocationBtn />
        </div>
      </div>
    </div>
  );
}
