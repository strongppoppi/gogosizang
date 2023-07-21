"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import anime from "animejs";

import logo from "/public/brand/logo.png";

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
    <div className="flex flex-col h-screen justify-center items-center bg-main">
      <Image src={logo} width={`100%`} height={`100%`} alt="로고" id="logo" />
    </div>
  );
}
