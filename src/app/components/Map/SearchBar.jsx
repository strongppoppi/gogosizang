"use client";
import React, { useState } from "react";
import Image from "next/image";

import icon from "/public/icons/search_grey.svg";

export default function SearchBar({ isSearchBarClicked, toggleSearchBar }) {
  return (
    <>
      {isSearchBarClicked ? (
        <></>
      ) : (
        <div className="w-11/12 p-3 rounded-lg shadow flex flex-row justify-start items-center bg-white absolute top-4 left-1/2 transform -translate-x-1/2">
          <button
            className="flex items-center outline-none focus:outline-none w-full"
            onClick={() => {
              toggleSearchBar();
            }}
          >
            <Image src={icon} width={24} height={24} alt="아이콘" />
            <span className="text-[15px] font-normal text-gray-500 ml-2">
              시장명·지역으로 검색
            </span>
          </button>
        </div>
      )}
    </>
  );
}
