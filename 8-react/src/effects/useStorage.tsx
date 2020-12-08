import React, {useEffect, useState} from 'react';

export function useStorage<T>(key: string, defaultValue: T) {
    const [storageValue, setStorageValue] = useState<T>();

    useEffect(() => {
        const unparsedStorageValue = localStorage.getItem(key);
        setStorageValue(unparsedStorageValue === null ? 
            defaultValue : JSON.parse(unparsedStorageValue));
    }, []);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storageValue));
    }, [storageValue]);

    return [storageValue, setStorageValue] as const;
}