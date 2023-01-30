import { useState, useEffect } from 'react';

export const useConTextMenu = () => {
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        const handleClick = (event: any) => {
            event.preventDefault();
            setClicked(false);
        };
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    return ({ clicked, setClicked });
}