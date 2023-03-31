import { useLayoutEffect, useState } from 'react';

export const useInnerWidth = (): number => {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    useLayoutEffect(() => {
        const updateSize = () => {
            setInnerWidth(window.innerWidth);
        };
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return innerWidth;
};
