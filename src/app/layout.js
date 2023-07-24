"use client";

import "./globals.css";
import React, { useState, useEffect, useRef } from "react";
import Script from "next/script";
import localFont from "next/font/local";
import { usePathname } from "next/navigation";

import SplashScreen from "./components/SplashScreen";
import BottomTab from "./components/common/BottomTab";

export const Pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
});

const metadata = {
  title: "시장가장",
  description: "Published by 최강맹수뽀삐",
};

export default function RootLayout({ children }) {
  const pathName = usePathname();
  const isHome = pathName === "/";
  const [isLoading, setIsLoading] = useState(isHome);
  const windowHeight = useRef(0);

  useEffect(() => {
    if (isLoading) return;
  }, [isLoading]);

  useEffect(() => {
        windowHeight.current = window.innerHeight;
    }, []);

  return (
    <html lang="kr">
      <head>
        <Script
          strategy="beforeInteractive"
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        />
      </head>
      <body className={Pretendard.className}>
        {isLoading && isHome ? (
          <SplashScreen finishLoading={() => setIsLoading(false)} />
        ) : (
          <div className="flex flex-col" style={{ height: windowHeight.current }}>
            {children}
            <BottomTab />
          </div>
        )}
      </body>
    </html>
  );
}
