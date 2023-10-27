'use client';

import { useEffect, useRef, useState } from 'react';
import { Young_Serif, Nunito_Sans } from 'next/font/google';

import debounce from '@/utils/debounce';

import LanguageSwitcher from '@/components/val/language-switcher/language-switcher';
import Hero from '@/components/val/hero/hero';
import SectionZero from '@/components/val/section-0/section-0';
import SectionOne from '@/components/val/section-1/section-1';
import SectionTwo from '@/components/val/section-2/section-2';
import SectionThree from '@/components/val/section-3/section-3';
import SectionFour from '@/components/val/section-4/section-4';
import SectionFive from '@/components/val/section-5/section-5';
import ProgressTracker from '@/components/val/progress-tracker/progress-tracker';

const youngSerif = Young_Serif({
    weight: '400',
    subsets: ['latin-ext'],
    variable: '--font-young-serif',
    preload: true,
});

const poppins = Nunito_Sans({
    weight: '400',
    subsets: ['latin-ext'],
    variable: '--font-nunito',
    preload: true,
});

export default function ValHome() {
    const [showHeader, setShowHeader] = useState(true);

    const sectionOneRef   = useRef<HTMLElement | null>(null);
    const sectionTwoRef   = useRef<HTMLElement | null>(null);
    const sectionThreeRef = useRef<HTMLElement | null>(null);
    const sectionFourRef  = useRef<HTMLElement | null>(null);
    const sectionFiveRef  = useRef<HTMLElement | null>(null);
    const lastScrollTop = useRef(0);

    useEffect(() => {
        const scrollHandler = debounce(() => {
            let scrollTop = window.scrollY || document.documentElement.scrollTop;
            const userScrolledDown = scrollTop > lastScrollTop.current;

            setShowHeader(!userScrolledDown);

            // Update last scroll position
            lastScrollTop.current = scrollTop;
        }, 100);

        document.addEventListener('scroll', scrollHandler);

        return () => {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    return (<>
        <div className={`bg-amber-50 dark:bg-stone-950 w-[100svw] min-h-[100svh] max-w-full ${youngSerif.variable} ${poppins.variable}`}>
            <header className={`${showHeader ? 'opacity-100' : 'opacity-0'} transition-opacity fixed top-4 right-4 z-50`}>
                <LanguageSwitcher />
            </header>

            {/* eztodo add refs for each section and pass to the progress tracker. also, pass the 'showheader' var to the progress tracker as 'expanded' prop */}
            <article>
                <section>
                    <Hero />
                </section>

                <section>
                    <SectionZero />
                </section>

                <section ref={sectionOneRef}>
                    <SectionOne />
                </section>

                <section ref={sectionTwoRef}>
                    <SectionTwo />
                </section>

                <section ref={sectionThreeRef}>
                    <SectionThree />
                </section>

                <section ref={sectionFourRef}>
                    <SectionFour />
                </section>

                <section ref={sectionFiveRef}>
                    <SectionFive />
                </section>
            </article>

            <ProgressTracker />
        </div>
    </>);
}
