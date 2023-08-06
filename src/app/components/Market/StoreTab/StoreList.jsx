"use client"

import { useState, useEffect, useRef } from 'react';

import StoreItem from "./StoreItem";

export default function StoreList({ marketKey, storeKeys, setSelectedStore }) {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [firstLoad, setFirstLoad] = useState(false);
    const itemsPerLoad = 10;
    const scrollRef = useRef(null);

    const loadItems = () => {
        if (firstLoad) {
            console.log("loadItems from", 1, "to", Math.min(itemsPerLoad, storeKeys.length), "(firstLoad)");
            var newItems = storeKeys.slice(0, Math.min(itemsPerLoad, storeKeys.length));
            setItems(newItems);
            setFirstLoad(false);
        } else {
            if (items.length >= storeKeys.length) return;   // 마지막 상점까지 모두 렌더링됐다면 종료
            var newItems = storeKeys.slice(0, Math.min(items.length + itemsPerLoad, storeKeys.length));
            setItems(newItems);
        }
    };

    useEffect(() => {
        setItems([]);
        scrollRef.current.scrollTo({
            top: 0,
            behavior: 'auto',
        });
        setFirstLoad(true);
        setIsLoading(true);
    }, [storeKeys]);

    useEffect(() => {
        if (isLoading) {
            loadItems();
            setIsLoading(false);
        }
    }, [isLoading]);

    useEffect(() => {
        const handleScroll = () => {
            if (scrollRef.current) {
                const { clientHeight, scrollHeight, scrollTop } = scrollRef.current;
                if (clientHeight + scrollTop + 1 >= scrollHeight) {
                    setIsLoading(true);
                }
            }
        };

        if (scrollRef.current) {
            scrollRef.current.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (scrollRef.current) {
                scrollRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);


    return (
        <div ref={scrollRef} className="w-full flex flex-col justify-start items-center overflow-y-scroll divide-y-2 divide-gray-200">
            {items.map((item, index) => (
                <StoreItem key={index} marketKey={marketKey} storeKey={item} setSelectedStore={setSelectedStore} />
            ))}
        </div>
    )
}
