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

            setExpanded(!userScrolledDown);

            setHidden(scrollTop < document.documentElement.clientHeight);

            // Update last scroll position
            lastScrollTop.current = scrollTop;

            const rootElement = rootElementRef.current;
            const sectionOne = sectionOneRef.current;
            const sectionTwo = sectionTwoRef.current;
            const sectionThree = sectionThreeRef.current;
            const sectionFour = sectionFourRef.current;
            const sectionFive = sectionFiveRef.current;

            if (!rootElement || !sectionOne || !sectionTwo || !sectionThree || !sectionFour || !sectionFive) {
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

            // Calculate the total height of the 5 "real" sections
            const totalHeight = sectionOneHeight + sectionTwoHeight + sectionThreeHeight + sectionFourHeight + sectionFiveHeight - window.innerHeight;

            // Calculate the starting offset; this is where the first "real" section starts.
            const startOffset = sectionOneOffset;

            // Calculate how far the user has scrolled, taking the starting offset into account.
            const scrolledTop = Math.max(0, window.scrollY || document.documentElement.scrollTop) - startOffset;

            let currentSectionProgress = 0;
            let scrolledPastHeight = 0;

            const scrolled = scrolledTop + startOffset;

            // Determine which section the user is currently in and calculate the progress within that section
            if (scrolled >= sectionFiveOffset) {
                currentSectionProgress = ((scrolled - sectionFiveOffset) / sectionFiveHeight) * (sectionFiveHeight / totalHeight) * 100;
                scrolledPastHeight = sectionOneHeight + sectionTwoHeight + sectionThreeHeight + sectionFourHeight;
            } else if (scrolled >= sectionFourOffset) {
                currentSectionProgress = ((scrolled - sectionFourOffset) / sectionFourHeight) * (sectionFourHeight / totalHeight) * 100;
                scrolledPastHeight = sectionOneHeight + sectionTwoHeight + sectionThreeHeight;
            } else if (scrolled >= sectionThreeOffset) {
                currentSectionProgress = ((scrolled - sectionThreeOffset) / sectionThreeHeight) * (sectionThreeHeight / totalHeight) * 100;
                scrolledPastHeight = sectionOneHeight + sectionTwoHeight;
            } else if (scrolled >= sectionTwoOffset) {
                currentSectionProgress = ((scrolled - sectionTwoOffset) / sectionTwoHeight) * (sectionTwoHeight / totalHeight) * 100;
                scrolledPastHeight = sectionOneHeight;
            } else if (scrolled >= sectionOneOffset) {
                currentSectionProgress = (scrolledTop / sectionOneHeight) * (sectionOneHeight / totalHeight) * 100;
            }

            // Calculate the overall progress by combining the progress in the current section with the height of sections the user has already scrolled past
            const overallProgress = (scrolledPastHeight / totalHeight) * 100 + currentSectionProgress;

            setProgressPercent(Number(overallProgress.toFixed(0)));
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

    useEffect(() => {
        rootElementRef.current!.style.setProperty('--progress-percent', `${progressPercent}%`);
    }, [progressPercent]);

    return (
        <div
            ref={rootElementRef}
            className={`c-progress-tracker ${expanded ? 'c-progress-tracker--expanded' : ''} ${hidden ? 'c-progress-tracker--hidden' : ''}`}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Number(progressPercent.toFixed(0))}
            onMouseOver={() => setExpanded(true)}
            onMouseOut={() => setExpanded(false)}
        >
            {/*
                this div acts as a handle by expanding the mouseover section, making it easier for desktop users to expand the navbar on hover;
                without it, it is very easy to accidentally mouse out of the navbar and have it collapse unintentionally.
            */}
            <div className="absolute -top-6 h-6 w-full hidden lg:block"></div>

            <nav role="navigation" className="relative flex items-center justify-around w-full">
                {buttons.map((button, index) => (
                    <button
                        key={`nav-button-${index}`}
                        className={`${expanded ? 'h-6 w-6' : 'h-1.5 w-1.5'} rounded-full flex items-center justify-center bg-amber-50 border-[1px] border-amber-900 transition-all z-10`}
                        aria-label={`${t('nav.go_to_section_label')} ${index + 1}`}
                        title={`${t('nav.go_to_section_label')} ${index + 1}`}
                        onClick={() => scrollTo({ top: button.ref.current!.offsetTop, behavior: 'instant' })}
                        onFocus={() => setExpanded(true)}
                    >
                        {expanded && <span className="text-xs font-header text-amber-900">{button.label}</span>}
                    </button>
                ))}
            </nav>
        </div>
    );
}
