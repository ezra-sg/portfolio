import { RefObject, useEffect, useRef, useState } from 'react';

import './progress-tracker.scss';

import throttle from '@/utils/throttle';
import { useI18n } from '@/hooks/useI18n';

interface ProgressTrackerProps {
    sectionOneRef: RefObject<HTMLElement>;
    sectionTwoRef: RefObject<HTMLElement>;
    sectionThreeRef: RefObject<HTMLElement>;
    sectionFourRef: RefObject<HTMLElement>;
    sectionFiveRef: RefObject<HTMLElement>;
}

export default function ProgressTracker({
    sectionOneRef,
    sectionTwoRef,
    sectionThreeRef,
    sectionFourRef,
    sectionFiveRef,
}: ProgressTrackerProps) {
    const [progressPercent, setProgressPercent] = useState(0);
    const [expanded, setExpanded] = useState(false);
    const [hidden, setHidden] = useState(true);

    const rootElementRef = useRef<HTMLDivElement | null>(null);
    const lastScrollTop = useRef(0);

    const { t } = useI18n();

    const buttons = [
        {
            label: 'I',
            ref: sectionOneRef,
        },
        {
            label: 'II',
            ref: sectionTwoRef,
        },
        {
            label: 'III',
            ref: sectionThreeRef,
        },
        {
            label: 'IV',
            ref: sectionFourRef,
        },
        {
            label: 'V',
            ref: sectionFiveRef,
        },
    ];

    useEffect(() => {
        const scrollHandler = throttle(() => {
            // scroll handler controls 3 things:
            // 1. whether the progress tracker is hidden or not, based on whether the user has scrolled past the height of the viewport
            // 2. whether the progress tracker is expanded or not, based on the user's scroll direction
            // 3. the progress percentage, based on the user's scroll position

            let scrollTop = window.scrollY || document.documentElement.scrollTop;
            const userScrolledDown = scrollTop >= lastScrollTop.current;

            (scrollTop !== lastScrollTop.current) && setExpanded(!userScrolledDown);

            setHidden(scrollTop < 100);

            // Update last scroll position
            lastScrollTop.current = scrollTop;

            const sectionOne = sectionOneRef.current;
            const sectionTwo = sectionTwoRef.current;
            const sectionThree = sectionThreeRef.current;
            const sectionFour = sectionFourRef.current;
            const sectionFive = sectionFiveRef.current;

            if (!sectionOne || !sectionTwo || !sectionThree || !sectionFour || !sectionFive) {
                return;
            }

            const sectionOneHeight = sectionOne.clientHeight;
            const sectionTwoHeight = sectionTwo.clientHeight;
            const sectionThreeHeight = sectionThree.clientHeight;
            const sectionFourHeight = sectionFour.clientHeight;
            const sectionFiveHeight = sectionFive.clientHeight;

            const sectionOneOffset = sectionOne.offsetTop;
            const sectionTwoOffset = sectionTwo.offsetTop;
            const sectionThreeOffset = sectionThree.offsetTop;
            const sectionFourOffset = sectionFour.offsetTop;
            const sectionFiveOffset = sectionFive.offsetTop;

            // Calculate how far the user has scrolled, taking the starting offset into account.
            const scrolledTop = Math.max(0, window.scrollY || document.documentElement.scrollTop);
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            const bottomOfScreen = scrolledTop + viewportHeight;

            let currentSectionProgress: number;
            let scrolledPastHeight: number;

            const getSectionProgressPercentage = (sectionOffset: number, sectionHeight: number) => {
                let percentageAboveBottom = ((scrolledTop + viewportHeight - sectionOffset) / sectionHeight) * 100;
                return Math.min(100, Math.max(0, percentageAboveBottom));
            };

            // Determine which section the user is currently in and calculate the progress within that section
            if ((scrolledTop + viewportHeight) < sectionOneOffset) {
                currentSectionProgress = 0;
                scrolledPastHeight = 0;
            } else if ((sectionOneOffset + sectionOneHeight) > bottomOfScreen) {
                currentSectionProgress = getSectionProgressPercentage(sectionOneOffset, sectionOneHeight);
                scrolledPastHeight = 0;
            } else if ((sectionTwoOffset + sectionTwoHeight) > bottomOfScreen) {
                currentSectionProgress = getSectionProgressPercentage(sectionTwoOffset, sectionTwoHeight);
                scrolledPastHeight = 1/5 * 100;
            } else if ((sectionThreeOffset + sectionThreeHeight) > bottomOfScreen) {
                currentSectionProgress = getSectionProgressPercentage(sectionThreeOffset, sectionThreeHeight);
                scrolledPastHeight = 2/5 * 100;
            } else if ((sectionFourOffset + sectionFourHeight) > bottomOfScreen) {
                currentSectionProgress = getSectionProgressPercentage(sectionFourOffset, sectionFourHeight);
                scrolledPastHeight = 3/5 * 100;
            } else {
                currentSectionProgress = getSectionProgressPercentage(sectionFiveOffset, sectionFiveHeight);
                scrolledPastHeight = 4/5 * 100;
            }

            // Calculate the overall progress by combining the progress in the current section with the height of sections the user has already scrolled past
            const overallProgress = scrolledPastHeight + (currentSectionProgress * 1/5);

            const newProgressPercent = Number(overallProgress.toFixed(0));

            setProgressPercent(newProgressPercent);
            rootElementRef.current!.style.setProperty('--progress-percent', `${newProgressPercent}%`);
        }, 100);

        scrollHandler();

        document.addEventListener('scroll', scrollHandler);

        return () => {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, [
        sectionOneRef,
        sectionTwoRef,
        sectionThreeRef,
        sectionFourRef,
        sectionFiveRef,
    ]);

    return (
        <div
            ref={rootElementRef}
            className={`c-progress-tracker ${expanded ? 'c-progress-tracker--expanded' : ''}`}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Number(progressPercent.toFixed(0))}
            hidden={hidden}
            aria-hidden={hidden}
            onMouseOver={() => setExpanded(true)}
            onMouseOut={() => setExpanded(false)}
        >
            {expanded && (
                <div
                    className="absolute -top-14 right-0 left-0 rounded-md w-max bg-amber-50 p-2 font-header m-auto animate-fade-in-fast shadow-lg"
                    aria-hidden={true}
                >
                    {t('nav.sections')}
                </div>
            )}

            {/*
                this div acts as a handle by expanding the mouseover section, making it easier for desktop users to expand the navbar on hover;
                without it, it is very easy to accidentally mouse out of the navbar and have it collapse unintentionally.
            */}
            <div className="absolute -top-6 h-6 w-full hidden lg:block"></div>

            <nav role="navigation" className="relative flex items-center justify-around w-full">
                {buttons.map((button, index) => (
                    <button
                        key={`nav-button-${index}`}
                        className={`${expanded ? 'h-9 w-10 lg:w-8 lg:h-8 rounded-lg px-2' : 'h-1.5 w-1.5'} rounded-full flex items-center justify-center bg-amber-50 border-[1px] border-amber-900 transition-all z-10 hover:border-[2px]`}
                        aria-label={`${t('nav.go_to_section_label')} ${index + 1}`}
                        title={`${t('nav.go_to_section_label')} ${index + 1}`}
                        onClick={() => scrollTo({ top: button.ref.current!.offsetTop, behavior: 'instant' })}
                        onFocus={() => setExpanded(true)}
                    >
                        {expanded && <span className="text-sm font-header text-amber-900 animate-fade-in-fast">{button.label}</span>}
                    </button>
                ))}
            </nav>
        </div>
    );
}
