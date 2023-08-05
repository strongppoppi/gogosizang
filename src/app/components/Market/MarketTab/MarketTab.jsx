"use client";

import { useEffect, useRef } from "react";
import StoreRanking from "./StoreRanking";
import MarketContents from "./MarketContents";

export default function MarketTab({ marketKey }) {

  return (
    <div className="w-full h-[calc(100dvh-96px)] flex flex-col items-center">
      <StoreRanking />
      <MarketContents />
    </div>
  );
}
