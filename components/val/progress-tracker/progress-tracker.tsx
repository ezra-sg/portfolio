import { useEffect, useRef } from 'react';

import './progress-tracker.scss';

import debounce from '@/utils/debounce';

export default function ProgressTracker() {
    const rootElementRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const scrollHandler = debounce(() => {
        }, 100);

        document.addEventListener('scroll', scrollHandler);

        return () => {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    return (
        <div
            ref={rootElementRef}
            className="c-progress-tracker"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={50}
        >

        </div>
    );
}
