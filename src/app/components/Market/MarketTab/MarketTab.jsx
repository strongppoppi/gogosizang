"use client";

import { useEffect, useRef } from "react";
import StoreRanking from "./StoreRanking";
import MarketContents from "./MarketContents";

export default function MarketTab({ marketKey }) {
  const windowHeight = useRef(0);

  useEffect(() => {
    windowHeight.current = window.innerHeight;
  }, []);

  return (
    <div
      className="w-full flex flex-col items-center"
      style={{ height: windowHeight - 96 }}
    >
      <StoreRanking />
      <MarketContents />
    </div>
  );
}
