import {useEffect, useState} from 'react';
import Cookies from 'js-cookie';

const useCookie = <T>(cookieName: string, initialValue: T) => {
    const [cookieValue, setCookieValue] = useState(() => {
        const storedValue = Cookies.get(cookieName);
        return storedValue ? JSON.parse(storedValue) : initialValue;
    });

    useEffect(() => {
        Cookies.set(cookieName, JSON.stringify(cookieValue));
    }, [cookieName, cookieValue]);


    return [cookieValue, setCookieValue] as const;
};

export default useCookie;