"use client";

import React, { useState, useRef, useEffect } from 'react';

export default function Drawer({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const dragRef = useRef(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        dragRef.current.style.transition = "height 0.3s ease";
    }, []);

    useEffect(() => {
        setIsOpen(true);

        // 시장화면 <-> 상점화면 이동할 때 드로어 맨 위로 자동 스크롤
        scrollRef.current.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [children]);

    // 클릭 시 드로어 열림/닫힘
    const handleClick = () => setIsOpen(!isOpen);

    return (
        <div
            ref={dragRef}
            style={{ boxShadow: '0px -1px 10px rgba(17, 18, 19, 0.18)' }}
            className={`${isOpen ? "h-[calc(100dvh-15px)]" : "h-[32px]"} absolute z-10 bottom-0 w-full rounded-t-3xl bg-white flex flex-col items-center overflow-visible`}
        >
            <div
                onClick={handleClick}
                className="w-full h-8 flex justify-center"
            >
                <div className="w-24 h-1 rounded-full bg-gray-200 mt-2 mb-7" />
            </div>
            <div ref={scrollRef} className='w-full flex flex-col justify-start items-center overflow-y-scroll'>
                {children}
            </div>
        </div>
    );
};