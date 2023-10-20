import { useCallback, useEffect, useRef, useState } from 'react';
import {
    MdPlayCircleOutline,
    MdOutlinePauseCircleOutline,
    MdSpeed,
    MdRestartAlt,
} from 'react-icons/md';

import './audio-player.scss';

import { useI18n } from '@/hooks/useI18n';
import { prettyPrintTimestamp } from '@/utils/text-utils';

export type AudioPlayerProps = {
    src: string;
    labelledBy: string; // the id of the element which describes the audio
    title: string; // a short description of the audio
};

const playbackSpeedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75];

export default function AudioPlayer({ src, labelledBy, title }: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showSpeedOptions, setShowSpeedOptions] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [showRestartIcon, setShowRestartIcon] = useState(false);
    const [audioTime, setAudioTime] = useState(0);
    const [totalAudioTime, setTotalAudioTime] = useState(0);

    const audioElementRef = useRef<HTMLAudioElement | null>(null);
    const scrubberElementRef = useRef<HTMLInputElement | null>(null);
    const playbackSpeedMenuRef = useRef<HTMLUListElement | null>(null);
    const playbackSpeedButtonRef = useRef<HTMLButtonElement | null>(null);
    const playbackSpeedClickawayHandlerRef = useRef<null | ((event: MouseEvent) => void)>(null);

    const { t } = useI18n();

    const playButtonAriaLabel = `${
        showRestartIcon ? t('inputs.restart_audio_aria') : t(`inputs.${isPlaying ? 'pause' : 'play'}_audio_aria`)
    } ${title}`;

    const audioTimePretty = prettyPrintTimestamp(audioTime);
    const prettyTotalAudioTime = prettyPrintTimestamp(totalAudioTime);

    const handlePlaybackSpeedClickaway = useCallback((event: MouseEvent) => {
        const clickedElement = event.target as HTMLElement;
        const userClickedAway = ![playbackSpeedMenuRef, playbackSpeedButtonRef].some(({ current }) => current!.contains(clickedElement));

        if (userClickedAway) {
            setShowSpeedOptions(false);
        }
    }, []);
    playbackSpeedClickawayHandlerRef.current = handlePlaybackSpeedClickaway;

    useEffect(() => {
        const audioElement = audioElementRef.current!;
        const scrubberElement = scrubberElementRef.current!;

        const handleAudioMetaLoaded = () => {
            scrubberElement.max = audioElement.duration.toString();
            setTotalAudioTime(audioElement.duration);
        };

        const handleAudioTimeUpdate = () => {
            scrubberElement.value = audioElement.currentTime.toString();
            setAudioTime(audioElement.currentTime);
        };

        const updateAudioPosition = () => {
            audioElement.currentTime = Number(scrubberElement.value);
        };

        if (audioElement.readyState >= 1) {
            handleAudioMetaLoaded();
        } else {
            audioElement.addEventListener('loadedmetadata', handleAudioMetaLoaded);
        }
        audioElement.addEventListener('timeupdate', handleAudioTimeUpdate);
        scrubberElement.addEventListener('input', updateAudioPosition);

        return () => {
            audioElement.removeEventListener('loadedmetadata', handleAudioMetaLoaded);
            audioElement.removeEventListener('timeupdate', handleAudioTimeUpdate);
            scrubberElement.removeEventListener('input', updateAudioPosition);
        };
    }, []);

    useEffect(() => {
        const audioElement = audioElementRef.current!;
        if (isPlaying) {
            if (audioElement.currentTime === audioElement.duration) {
                // restart audio
                audioElement.currentTime = 0;
            }
            audioElement.play();
        } else {
            audioElement.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        if (showSpeedOptions) {
            document.addEventListener('mousedown', playbackSpeedClickawayHandlerRef.current!);
        } else {
            document.removeEventListener('mousedown', playbackSpeedClickawayHandlerRef.current!);
        }

        return () => {
            document.removeEventListener('mousedown', playbackSpeedClickawayHandlerRef.current!);
        };
    }, [showSpeedOptions]);

    return (<>
        <div className="flex items-center gap-2 text-2xl text-amber-900 dark:text-amber-200">
            {/* play/pause button */}
            <button
                onClick={() => {
                    setIsPlaying(!isPlaying);
                    setShowRestartIcon(false);
                }}
                onKeyDown={(event) => {
                    if([' ', 'Enter'].includes(event.key)) {
                        event.preventDefault();
                        setIsPlaying(!isPlaying);
                        setShowRestartIcon(false);
                    }
                }}
                aria-label={playButtonAriaLabel}
                className="h-8 w-8 flex items-center justify-center"
            >
                {
                    isPlaying ?
                        <MdOutlinePauseCircleOutline aria-hidden= "true" /> :
                        (showRestartIcon ? <MdRestartAlt aria-hidden="true" /> : <MdPlayCircleOutline aria-hidden="true" />)
                }
            </button>

            {/* time elapsed */}
            <code className="text-xs" title={`${t('inputs.audio_time_elapsed_title')} ${title}`}>
                {audioTimePretty}
            </code>

            {/* audio scrubber */}
            <input
                ref={scrubberElementRef}
                type="range"
                min="0"
                step="0.1"
                defaultValue={0}
                aria-label={`${t('inputs.audio_scrubber_aria')} ${title}`}
                className="c-audio-player__scrubber"
            />

            {/* total audio time */}
            <code className="text-xs" title={`${t('inputs.audio_time_total_title')} ${title}`}>
                {prettyTotalAudioTime}
            </code>

            {/* audio speed controls */}
            <div className="relative">
                <button
                    ref={playbackSpeedButtonRef}
                    onClick={() => setShowSpeedOptions(!showSpeedOptions)}
                    onKeyDown={(event) => {
                        if ([' ', 'Enter'].includes(event.key)) {
                            event.preventDefault();
                            setShowSpeedOptions(!showSpeedOptions);
                        }
                    }}
                    className="h-8 w-8 flex items-center justify-center"
                >
                    <MdSpeed aria-hidden="true" />
                </button>

                {/* eztodo make hook for clickaway, add here */}
                <ul
                    ref={playbackSpeedMenuRef}
                    role="menu"
                    className="absolute p-3 bg-amber-50 shadow-lg rounded-sm"
                    hidden={!showSpeedOptions}
                    aria-hidden={!showSpeedOptions}
                    aria-label={`${t('inputs.audio_speed_menu_label')} ${title}`}
                    onKeyDown={(event) => {
                        if (event.key === 'Escape') {
                            setShowSpeedOptions(false);
                        }
                    }}
                >
                    {playbackSpeedOptions.map((speed, index) => (
                        <li
                            key={`audio-speed-label-${labelledBy}-${index}`}
                            role="menuitemradio"
                            aria-checked={playbackSpeed === speed}
                            tabIndex={0}
                            aria-label={`${t('inputs.audio_speed_item_label')} ${speed}`}
                            className={`${playbackSpeed === speed ? 'font-bold' : ''} text-sm cursor-pointer my-2 hover:underline`}
                            onClick={() => {
                                audioElementRef.current!.playbackRate = speed;
                                setPlaybackSpeed(speed);
                            }}
                            onKeyDown={(event) => {
                                if ([' ', 'Enter'].includes(event.key)) {
                                    event.preventDefault();
                                    audioElementRef.current!.playbackRate = speed;
                                    setPlaybackSpeed(speed);
                                }
                            }}
                        >
                            {speed}x
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        <audio
            ref={audioElementRef}
            controls
            src={src}
            aria-labelledby={labelledBy}
            hidden
            onEnded={() => {
                setIsPlaying(false);
                setShowRestartIcon(true);
            }}
        />
    </>);
}
