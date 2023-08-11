"use client";

import "./globals.css";
import React, { useState, useEffect, useRef } from "react";
import Script from "next/script";
import { Noto_Sans_KR } from "next/font/google";
import { usePathname } from "next/navigation";

import SplashScreen from "./components/SplashScreen";
import BottomTab from "./components/common/BottomTab";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const metadata = {
  title: "시장가장",
  description: "Published by 최강맹수뽀삐",
};

export default function RootLayout({ children }) {
  const pathName = usePathname();
  const isHome = pathName === "/";
  const [isLoading, setIsLoading] = useState(isHome);
  const showBottomTab =
    !pathName.startsWith("/market") && !pathName.startsWith("/editor");

  useEffect(() => {
    if (isLoading) return;
  }, [isLoading]);

  useEffect(() => {
    // 초기 뷰포트 높이 값 설정
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    // 리사이즈 이벤트 핸들러 등록
    const handleResize = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 리사이즈 이벤트 핸들러 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // 빈 배열은 컴포넌트 마운트 시에만 실행되도록 합니다.

  return (
    <html lang="kr">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
        />
        <Script
          strategy="beforeInteractive"
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        />
      </head>
      <body className={notoSansKr.className}>
        {isLoading && isHome ? (
          <SplashScreen finishLoading={() => setIsLoading(false)} />
        ) : (
          <div
            className="flex flex-col"
            style={{ height: `calc(var(--vh, 1vh) * 100)` }}
          >
            {children}
            {showBottomTab && <BottomTab />}
          </div>
        )}
      </body>
    </html>
  );
}
