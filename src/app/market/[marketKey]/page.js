"use client"

import { useState } from "react";

import Drawer from "@/app/components/Market/Drawer";
import MarketInfo from "@/app/components/Market/MarketInfo";
import InfoTab from "@/app/components/Market/InfoTab";
import MarketImage from "@/app/components/Market/MarketImage";

import backIcon from "public/icons/arrow_left_black.png";
import Image from "next/image";
import MarketMap from "@/app/components/Market/MarketMap";
import Link from "next/link";

export default function MarketPage({ params }) {
  var marketKey = params.marketKey;
  const [naverMap, setNaverMap] = useState(null);

  return (
    <div className="h-full flex-col grow relative overflow-y-scroll">
      <Drawer>
        <MarketImage marketKey={marketKey} />
        <MarketInfo marketKey={marketKey} />
        <InfoTab marketKey={marketKey} />
      </Drawer>
      <MarketMap setNaverMap={setNaverMap} marketKey={marketKey}/>
      <Link href="/map">
        <div className="absolute top-5 left-5 w-11 h-11 rounded-lg bg-white shadow-md flex justify-center items-center">
          <Image src={backIcon} width={24} height={24} alt="아이콘" />
        </div>
      </Link>
    </div>
  );
}
