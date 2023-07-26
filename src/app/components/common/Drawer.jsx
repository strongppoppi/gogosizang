"use client";

import React, { useState, useRef, useEffect } from 'react';

export default function Drawer({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    const dragRef = useRef(null);
    const maxHeight = useRef(32);

    useEffect(() => {
        maxHeight.current = window.innerHeight - 15;

        dragRef.current.style.transition = "height 0.3s ease";
    }, []);

    // 클릭 시 드로어 열림/닫힘
    const handleClick = () => setIsOpen(!isOpen);


    return (
        <div
            ref={dragRef}
            style={{ height: isOpen ? maxHeight.current : 32, boxShadow: '0px -1px 10px rgba(17, 18, 19, 0.18)' }}
            className="absolute z-10 bottom-0 w-full rounded-t-3xl bg-white flex flex-col items-center overflow-visible"
        >
            <div
                onClick={handleClick}
                className="w-full h-8 flex justify-center"
            >
                <div className="w-24 h-1 rounded-full bg-gray-200 mt-2 mb-7" />
            </div>
            <div className='w-full flex flex-col justify-start items-center overflow-y-scroll'>
                {children}
            </div>
        </div>
    );
};