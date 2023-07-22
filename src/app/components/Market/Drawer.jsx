"use client";

import React, { useState, useRef } from 'react';

export default function Drawer({ children }) {
    const [visibleHeight, setVisibleHeight] = useState(70);
    const [isDragging, setIsDragging] = useState(false);
    const dragRef = useRef(null);
    const startDragY = useRef(0);
    const windowHeight = window.innerHeight;

    // 클릭 시 드로어 열림/닫힘
    const handleClick = () => {
        if (visibleHeight == windowHeight) {
            changeHeight(70);
        } else if (visibleHeight == 70) {
            changeHeight(windowHeight);
        }
    }

    // PC 클릭 핸들러
    const handleMouseDown = (event) => {
        setIsDragging(true);
        startDragY.current = event.clientY;
    };

    const handleMouseMove = (event) => {
        if (isDragging) {
            const offsetY = event.clientY - startDragY.current;
            setVisibleHeight(Math.min(visibleHeight - offsetY, windowHeight));
            startDragY.current = event.clientY;
        }
    };

    const handleMouseUp = () => {
        if (isDragging) {
            if (visibleHeight > windowHeight / 2) {
                changeHeight(windowHeight);
            } else {
                changeHeight(70);
            }
        }
        setIsDragging(false);
    };

    // 모바일 터치 핸들러
    const handleTouchStart = (event) => {
        setIsDragging(true);
        startDragY.current = event.touches[0].clientY;
    };

    const handleTouchMove = (event) => {
        if (isDragging) {
            const offsetY = event.touches[0].clientY - startDragY.current;
            setVisibleHeight(visibleHeight - offsetY);
            startDragY.current = event.touches[0].clientY;
        }
    };

    const handleTouchEnd = () => {
        if (isDragging) {
            if (visibleHeight > windowHeight / 2) {
                changeHeight(windowHeight);
            } else {
                changeHeight(70);
            }
        }
        setIsDragging(false);
    };

    // 드로어에 애니메이션 효과 적용
    const changeHeight = (height) => {
        // 애니메이션 효과를 추가하기 위해 transition 속성 추가
        dragRef.current.style.transition = "height 0.3s ease";

        const intervalId = setInterval(() => {
            setVisibleHeight(height);
        }, 20);

        setTimeout(() => {
            clearInterval(intervalId);
            // 애니메이션 종료 후에 다시 transition 속성 추가
            dragRef.current.style.transition = "";
        }, 300);
    }


    return (
        <div
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="w-screen h-screen"
        >
            <div
                ref={dragRef}
                style={{ height: `${visibleHeight}px`, boxShadow: '0px -1px 10px rgba(17, 18, 19, 0.18)' }}
                className="absolute bottom-0 w-full rounded-t-3xl bg-white flex flex-col items-center overflow-hidden"
            >
                <div onClick={handleClick}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    className="w-full h-8 flex justify-center"
                >
                    <div className="w-24 h-1 rounded-full bg-gray-200 mt-2 mb-28" />
                </div>
                <div className='w-full flex flex-col justify-start items-center overflow-y-scroll'>
                    {children}
                </div>
            </div>
        </div>
    );
};