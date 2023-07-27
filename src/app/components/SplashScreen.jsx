"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import anime from "animejs";

import logo from "/public/brand/logo.png";
import splashImage from "/public/brand/splash.png";

export default function SplashScreen({ finishLoading }) {
  const [isMounted, setIsMounted] = useState(false);

  const animate = () => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    });

    loader
      .add({
        targets: "#logo",
        delay: 0,
        scale: 1,
        duration: 500,
        easing: "easeInOutExpo",
      })
      .add({
        targets: "#logo",
        delay: 0,
        scale: 1.15,
        duration: 500,
        easing: "easeInOutExpo",
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 2500);
    animate();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-main relative">
      <div className="w-full flex flex-col items-center absolute top-[20%]">
        <h1 className="text-[17px] font-medium text-white">전통시장이 핫플이 되는 매직!</h1>
        <Image src={logo} width={`100%`} height={`100%`} alt="로고" id="logo" className="mb-[470px]" />
      </div>
      <Image src={splashImage} height={430} alt="이미지" className="absolute -bottom-10 right-0" />
    </div>
  );
}
