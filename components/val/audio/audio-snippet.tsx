import { useEffect, useRef, useState } from 'react';

import { AudioStatus, useAudioContext } from '@/hooks/useAudioContext';
import {
    MdPlayCircleOutline,
    MdOutlinePauseCircleOutline,
    MdRestartAlt,
} from 'react-icons/md';

type AudioSnippetProps = {
    src: string;
    title: string;
    transcript: string;
};

export default function AudioSnippet({ src, title, transcript }: AudioSnippetProps) {
    const [icon, setIcon] = useState<'play' | 'pause' | 'restart'>('play');
    const [audioStatus, setAudioStatus] = useState<AudioStatus>(AudioStatus.stopped);
    const snippetId = title.replaceAll(' ', '-').toLowerCase();

    const {
        snippet: {
            playAudio,
            pauseAudio,
            subscribe,
            unsubscribe,
        },
    } = useAudioContext();

    function handleButtonClick() {
        const {
            playing,
            paused,
            complete,
            stopped,
        } = AudioStatus;
        const status = audioStatus;

        if ([playing, complete].includes(status)) {
            pauseAudio();
        } else if ([paused, stopped].includes(status)) {
            playAudio(snippetId, src, title, transcript);
        }
    }

    useEffect(() => {
        subscribe(snippetId, (status: AudioStatus) => {
            const {
                playing,
                paused,
                complete,
                stopped,
                loading,
            } = AudioStatus;

            if (status === playing) {
                setIcon('pause');
                setAudioStatus(playing);
            } else if (status === paused) {
                setIcon('play');
                setAudioStatus(paused);
            } else if (status === complete) {
                setIcon('restart');
                setAudioStatus(complete);
            } else if (status === stopped) {
                setIcon('play');
                setAudioStatus(stopped);
            } else {
                setIcon('play');
                setAudioStatus(loading);
            }
        });

        return () => {
            unsubscribe(snippetId);
        };
    }, [title, subscribe, unsubscribe, snippetId]);

    return (
        <div className="flex flex-col items-center justify-center">
            <h3 className="font-header dark:text-white">
                Audio: {title}
            </h3>

            <div className="flex gap-2 items-center">
                {audioStatus === AudioStatus.loading && <div className="animate-pulse">Loading...</div>}

                <button className="text-amber-900 dark:text-orange-300" onClick={handleButtonClick}>
                    {icon === 'play' && <MdPlayCircleOutline className="h-12 w-12" aria-hidden={true} />}
                    {icon === 'pause' && <MdOutlinePauseCircleOutline className="h-12 w-12" aria-hidden={true} />}
                    {icon === 'restart' && <MdRestartAlt className="h-12 w-12" aria-hidden={true} />}
                </button>

                <div className="text-xs">Spectrograph placeholder</div>
            </div>
        </div>
    );
}
