import { useEffect, useRef, useState } from 'react';
import { Young_Serif, Nunito_Sans } from 'next/font/google';

import LanguageSwitcher from '@/components/val/language-switcher/language-switcher';
import Hero from '@/components/val/hero/hero';
import Intro from '@/components/val/intro/intro';
import debounce from '@/utils/debounce';

const youngSerif = Young_Serif({
    weight: '400',
    subsets: ['latin-ext'],
    variable: '--font-young-serif',
});

const poppins = Nunito_Sans({
    weight: '400',
    subsets: ['latin-ext'],
    variable: '--font-nunito',
});

export default function ValHome() {
    const [showHeader, setShowHeader] = useState(true);

    const lastScrollTop = useRef(0);

    useEffect(() => {
        const scrollHandler = debounce(() => {
            let scrollTop = window.scrollY || document.documentElement.scrollTop;

            // Compare with the last scroll position
            if (scrollTop > lastScrollTop.current) {
                // User scrolled down
                setShowHeader(false); // Hide header
            } else {
                // User scrolled up
                setShowHeader(true); // Show header
            }

            // Update last scroll position
            lastScrollTop.current = scrollTop;
        }, 100);

        document.addEventListener('scroll', scrollHandler);

        return () => {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    return (
        <div className={`bg-amber-50 dark:bg-stone-950 w-[100svw] min-h-[100svh] max-w-full ${youngSerif.variable} ${poppins.variable}`}>
            <header className={`${showHeader ? 'opacity-100' : 'opacity-0'} transition-opacity fixed top-4 right-4 z-50`}>
                <LanguageSwitcher />
            </header>

            <article>
                <Hero />
                <Intro />
            </article>
        </div>
    );
}
