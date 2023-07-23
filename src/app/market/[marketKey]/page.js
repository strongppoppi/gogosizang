import Drawer from "@/app/components/Market/Drawer";
import MarketInfo from "@/app/components/Market/MarketInfo";
import InfoTab from "@/app/components/Market/InfoTab";
import MarketImage from "@/app/components/Market/MarketImage";


export default function MarketPage({params}) {
  var marketKey = params.marketKey;

  return (
    <div className="flex-col grow overflow-y-scroll">
      <h4>시장 상세 페이지</h4>
      <Drawer>
        <MarketImage marketKey={marketKey}/>
        <MarketInfo marketKey={marketKey}/>
        <InfoTab marketKey={marketKey}/>
      </Drawer>
    </div>
  );
}
