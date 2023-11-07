'use client';

import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Young_Serif, Nunito_Sans } from 'next/font/google';

import throttle from '@/utils/throttle';

import { AudioProvider } from '@/hooks/useAudioContext';

import AudioBanner from '@/components/val/audio/audio-banner';
import LanguageSwitcher from '@/components/val/language-switcher/language-switcher';
import Hero from '@/components/val/hero/hero';
import SectionZero from '@/components/val/sections/section-0';
import SectionOne from '@/components/val/sections/section-1';
import SectionTwo from '@/components/val/sections/section-2';
import SectionThree from '@/components/val/sections/section-3';
import SectionFour from '@/components/val/sections/section-4';
import SectionFive from '@/components/val/sections/section-5';

const ProgressTracker = lazy(() => import('@/components/val/progress-tracker/progress-tracker'));

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
    const [renderProgressTracker, setRenderProgressTracker] = useState(false);

    const sectionOneRef   = useRef<HTMLElement | null>(null);
    const sectionTwoRef   = useRef<HTMLElement | null>(null);
    const sectionThreeRef = useRef<HTMLElement | null>(null);
    const sectionFourRef  = useRef<HTMLElement | null>(null);
    const sectionFiveRef  = useRef<HTMLElement | null>(null);
    const lastScrollTop   = useRef(0);

    useEffect(() => {
        const scrollHandler = throttle(() => {
            if (!renderProgressTracker) {
                setRenderProgressTracker(true);
            }

            let scrollTop = window.scrollY || document.documentElement.scrollTop;
            const userScrolledDown = scrollTop > lastScrollTop.current;

            if (scrollTop !== lastScrollTop.current) {
                setShowHeader(!userScrolledDown);
            }

            // Update last scroll position
            lastScrollTop.current = scrollTop;
        }, 100);

        document.addEventListener('scroll', scrollHandler);

        return () => {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, [renderProgressTracker]);

    return (<>
        <div className={`bg-amber-50 dark:bg-stone-950 w-[100svw] min-h-[100svh] max-w-full ${youngSerif.variable} ${poppins.variable}`}>
            <AudioProvider>
                <AudioBanner />

                <div
                    hidden
                    role="region"
                    className={`${showHeader ? 'opacity-100' : 'opacity-0'} transition-opacity fixed top-4 right-4 z-50`}
                >
                    <LanguageSwitcher />
                </div>

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

                <Suspense fallback={null}>
                    {renderProgressTracker && (
                        <ProgressTracker
                            sectionOneRef={sectionOneRef}
                            sectionTwoRef={sectionTwoRef}
                            sectionThreeRef={sectionThreeRef}
                            sectionFourRef={sectionFourRef}
                            sectionFiveRef={sectionFiveRef}
                        />
                    )}
                </Suspense>
            </AudioProvider>
        </div>
    </>);
}
