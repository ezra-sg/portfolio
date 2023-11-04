import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { MdReadMore } from 'react-icons/md';

import { useI18n } from '@/hooks/useI18n';
import { AudioStatus, useAudioContext } from '@/hooks/useAudioContext';

import throttle from '@/utils/throttle';

import AudioPlayer from '@/components/val/audio/global-audio-player';


export default function AudioBanner() {
    const [markedForRemoval, setMarkedForRemoval] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);

    const lastScrollTop = useRef(0);
    const shouldRenderTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const { t } = useI18n();

    const {
        globalPlayer: {
            audioPlaybackState,
            currentAudioData,
        },
    } = useAudioContext();

    useEffect(() => {
        const scrollHandler = throttle(() => {
            let scrollTop = window.scrollY || document.documentElement.scrollTop;
            const userScrolledDown = scrollTop > lastScrollTop.current;

            // Update last scroll position
            lastScrollTop.current = scrollTop;

            if (userScrolledDown && markedForRemoval) {
                setIsRemoving(true);

                if (!shouldRenderTimeoutRef.current) {
                    shouldRenderTimeoutRef.current = setTimeout(() => {
                        setShouldRender(false);
                        shouldRenderTimeoutRef.current = null;
                    }, 500);
                }
            }
        }, 100);

        scrollHandler();

        document.addEventListener('scroll', scrollHandler);

        return () => {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, [markedForRemoval]);

    useEffect(() => {
        if (audioPlaybackState !== AudioStatus.stopped) {
            setIsRemoving(false);
            setShouldRender(true);
        }

        setMarkedForRemoval(audioPlaybackState === AudioStatus.stopped);
    }, [audioPlaybackState]);

    // eztodo
    // if (!shouldRender) {
    //     return null;
    // }

    return (
        // eztodo add aria label
        <div role="region" className={`${isRemoving ? '-top-40' : 'top-0'} fixed right-0 left-0 h-fit py-2 px-4 bg-amber-50 shadow-sm z-50 flex items-center justify-center flex-col transition-all duration-300 dark:bg-stone-950`}>
            <h3 id="audio-banner-title" className="font-header text-sm">
                {currentAudioData.title}
            </h3>

            <AudioPlayer labelledBy="audio-banner-title" />

            <div className="flex gap-2 items-center justify-center text-amber-900 dark:text-orange-300">
                <MdReadMore />

                <ReactMarkdown className="text-xs">
                    {t('global.view_transcript_md')}
                </ReactMarkdown>
            </div>
        </div>
    );
}
