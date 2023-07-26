"use client"

import { useState, useEffect, useRef } from 'react';

import StoreItem from "./StoreItem";

export default function StoreList({ marketKey, storeKeys, setSelectedStore }) {
    const [items, setItems] = useState([]);
    const [loadMore, setLoadMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const itemsPerLoad = 10;
    const scrollRef = useRef(null);

    const loadItems = () => {
        if (items.length >= storeKeys.length) {
            setLoadMore(false);
        } else {
            console.log("loadItems from", items.length + 1, "to", Math.min(items.length + itemsPerLoad, storeKeys.length));
            var newItems = [...items];
            for (let i = items.length; i < Math.min(items.length + itemsPerLoad, storeKeys.length); i++) {
                newItems.push(<div key={i} className='w-full flex flex-col items-center'>
                    {i !== 0 && <Line />}
                    <StoreItem marketKey={marketKey} storeKey={storeKeys[i]} setSelectedStore={setSelectedStore} />
                </div>)
            }
            setItems(newItems);
        }
    };

    const handleScroll = () => {
        if (scrollRef.current) {
            const { clientHeight, scrollHeight, scrollTop } = scrollRef.current;
            if (clientHeight + scrollTop + 1 >= scrollHeight) {
                if (loadMore) setIsLoading(true);
            }
        }
    };

    useEffect(() => {
        if (loadMore) loadItems();

        if (scrollRef.current) {
            scrollRef.current.addEventListener('scroll', handleScroll);
        }
    }, []);

    useEffect(() => {
        if (isLoading) {
            loadItems();
            setIsLoading(false);
        }
    }, [isLoading]);


    return (
        <div ref={scrollRef} className="w-full flex flex-col justify-start items-center overflow-y-scroll">
            {items}
        </div>
    )
}

function Line() {
    return (
        <div className="w-11/12 h-0.5 bg-gray-200" />
    )
}