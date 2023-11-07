'use client';

import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Young_Serif, Nunito_Sans } from 'next/font/google';

import throttle from '@/utils/throttle';

import { AudioProvider } from '@/hooks/useAudioContext';

import AudioBanner from '@/components/val/audio/audio-banner';
import LanguageSwitcher from '@/components/val/language-switcher/language-switcher';
import Hero from '@/components/val/hero/hero';
import SectionZero from '@/components/val/sections/section-0';

const SectionOne      = lazy(() => import('@/components/val/sections/section-1'));
const SectionTwo      = lazy(() => import('@/components/val/sections/section-2'));
const SectionThree    = lazy(() => import('@/components/val/sections/section-3'));
const SectionFour     = lazy(() => import('@/components/val/sections/section-4'));
const SectionFive     = lazy(() => import('@/components/val/sections/section-5'));
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

    const [renderSectionOne, setRenderSectionOne]     = useState(false);
    const [renderSectionTwo, setRenderSectionTwo]     = useState(false);
    const [renderSectionThree, setRenderSectionThree] = useState(false);
    const [renderSectionFour, setRenderSectionFour]   = useState(false);
    const [renderSectionFive, setRenderSectionFive]   = useState(false);

    const sectionOneRef   = useRef<HTMLElement | null>(null);
    const sectionTwoRef   = useRef<HTMLElement | null>(null);
    const sectionThreeRef = useRef<HTMLElement | null>(null);
    const sectionFourRef  = useRef<HTMLElement | null>(null);
    const sectionFiveRef  = useRef<HTMLElement | null>(null);
    const lastScrollTop   = useRef(0);

    const sectionFallback = <div className="w-full h-[200vh]"></div>;

    const sectionData = [{
        ref: sectionOneRef,
        shouldRender: renderSectionOne,
        Component: SectionOne,
    }, {
        ref: sectionTwoRef,
        shouldRender: renderSectionTwo,
        Component: SectionTwo,
    }, {
        ref: sectionThreeRef,
        shouldRender: renderSectionThree,
        Component: SectionThree,
    }, {
        ref: sectionFourRef,
        shouldRender: renderSectionFour,
        Component: SectionFour,
    }, {
        ref: sectionFiveRef,
        shouldRender: renderSectionFive,
        Component: SectionFive,
    }];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.target === sectionOneRef.current) {
                        setRenderSectionOne(isRendered => isRendered || entry.isIntersecting);
                    } else if (entry.target === sectionTwoRef.current) {
                        setRenderSectionTwo(isRendered => isRendered || entry.isIntersecting);
                    } else if (entry.target === sectionThreeRef.current) {
                        setRenderSectionThree(isRendered => isRendered || entry.isIntersecting);
                    } else if (entry.target === sectionFourRef.current) {
                        setRenderSectionFour(isRendered => isRendered || entry.isIntersecting);
                    } else if (entry.target === sectionFiveRef.current) {
                        setRenderSectionFive(isRendered => isRendered || entry.isIntersecting);
                    }
                });
            },
            { rootMargin: '1000px', threshold: 0.1 }
        );

        // Observe the placeholders
        [sectionOneRef, sectionTwoRef, sectionThreeRef, sectionFourRef, sectionFiveRef].forEach((ref) => {
            observer.observe(ref.current!);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

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

                    {sectionData.map(({ ref, shouldRender, Component }, index) => (
                        <section key={`home-section-${index}`} ref={ref} aria-live="polite">
                            {!shouldRender && sectionFallback}

                            <Suspense fallback={sectionFallback}>
                                {shouldRender && (
                                    <Component />
                                )}
                            </Suspense>
                        </section>
                    ))}
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
