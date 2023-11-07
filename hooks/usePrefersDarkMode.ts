import { useEffect, useState } from 'react';

export default function usePrefersDarkMode() {
    const [prefersDarkMode, setPrefersDarkMode] = useState(false);

    useEffect(() => {
        const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');

        setPrefersDarkMode(mediaQueryList.matches);

        const listener = (event: MediaQueryListEvent) => {
            setPrefersDarkMode(event.matches);
        };

        mediaQueryList.addEventListener('change', listener);

        return () => {
            mediaQueryList.removeEventListener('change', listener);
        };
    }, []);

    return prefersDarkMode;
}
