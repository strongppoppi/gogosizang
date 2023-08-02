"use client"

import { useState, useEffect, useRef } from 'react';

import StoreItem from "./StoreItem";

export default function StoreList({ marketKey, storeKeys, setSelectedStore }) {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [firstLoad, setFirstLoad] = useState(false);
    const [rerender, setRerender] = useState(true);
    const itemsPerLoad = 10;
    const scrollRef = useRef(null);

    const loadItems = () => {
        if (firstLoad) {
            console.log("loadItems from", 1, "to", Math.min(itemsPerLoad, storeKeys.length), "(firstLoad)");
            var newItems = [];
            for (let i = 0; i < Math.min(itemsPerLoad, storeKeys.length); i++) {
                newItems.push(<StoreItem marketKey={marketKey} storeKey={storeKeys[i]} setSelectedStore={setSelectedStore} />);
            }
            setItems(newItems);
            console.log("firstLoad - newItems:", newItems);
            console.log("firstLoad - items:", items);
            // 첫 렌더링에는 콘솔에는 newItems랑 items 다르게 찍히지만 화면에는 렌더링됨
            // 근데 그 다음부턴 (카테고리 변경) 콘솔에도 다르게 찍히고 화면에도 새로 렌더링 안됨 이전 items가 그대로 있음
            // 검색해보면 죄다 useEffect 쓰는 방법만 나오는데 난 그냥 items state 바뀐 게 바로 화면에 렌더링됐으면 좋겠단 말야.... 이건 어떻게 하냐고.............
            setFirstLoad(false);
        } else {
            if (items.length >= storeKeys.length) return;   // 마지막 상점까지 모두 렌더링됐다면 종료

            console.log("loadItems from", items.length + 1, "to", Math.min(items.length + itemsPerLoad, storeKeys.length));
            var newItems = [...items];
            for (let i = items.length; i < Math.min(items.length + itemsPerLoad, storeKeys.length); i++) {
                newItems.push(<StoreItem marketKey={marketKey} storeKey={storeKeys[i]} setSelectedStore={setSelectedStore} />);
            }
            setItems(newItems);
            console.log("load - newItems:", newItems);
            console.log("load - items:", items);
        }
    };

    useEffect(() => {
        console.log("useEffect (firstLoad)");
        scrollRef.current.scrollTo({
            top: 0,
            behavior: 'auto',
        });
        setFirstLoad(true);
        setIsLoading(true);
    }, [storeKeys]);

    useEffect(() => {
        if (isLoading) {
            console.log("useEffect (isLoading)");
            loadItems();
            setIsLoading(false);
        }
    }, [isLoading]);

    useEffect(() => {
        console.log("useEffect (items)", items);
        // items는 바뀌는데.. 왜 렌더링은 안돼....
        setRerender(!rerender);
    }, [items]);

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
        <div ref={scrollRef} className="w-full flex flex-col justify-start items-center overflow-y-scroll">
            {items.map((item, index) => (
                <div key={index} className='w-full flex flex-col items-center'>
                    {index !== 0 && <Line />}
                    {item}
                </div>
            ))}
        </div>
    )
}

function Line() {
    return (
        <div className="w-11/12 h-0.5 bg-gray-200" />
    )
}