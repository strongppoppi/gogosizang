"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import anime from "animejs";

import logo from "/public/brand/logo.svg";
import splashImage from "/public/brand/splash-image.svg";

export default function SplashScreen({ finishLoading }) {
  const [isMounted, setIsMounted] = useState(false);

  const animate = () => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    });

    loader.add({
      targets: "#logo",
      delay: 0,
      scale: 1,
      duration: 1500,
      easing: "easeInOutExpo",
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 2500);
    animate();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-main relative overflow-hidden">
      <div className="w-full flex flex-col items-center absolute top-[20%]">
        <h1 className="text-[17px] font-medium text-white">
          전통시장이 핫플이 되는 매직!
        </h1>
        <Image
          src={logo}
          width={302}
          height={124}
          alt="로고"
          id="logo"
          className="mb-[470px]"
        />
      </div>
      <Image
        src={splashImage}
        width={467}
        height={540}
        alt="이미지"
        className="absolute -bottom-[90px] -right-[80px]"
      />
    </div>
  );
}
