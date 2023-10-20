import { useEffect, useRef, useState } from 'react';
import {
    MdPlayCircleOutline,
    MdOutlinePauseCircleOutline,
    MdSpeed,
    MdRestartAlt,
} from 'react-icons/md';

import './audio-player.scss';

import { useI18n } from '@/hooks/useI18n';

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

    const audioElementRef = useRef<HTMLAudioElement | null>(null);
    const scrubberElementRef = useRef<HTMLInputElement | null>(null);

    const { t } = useI18n();

    const playButtonAriaLabel = `${
        showRestartIcon ? t('inputs.restart_audio_aria') : t(`inputs.${isPlaying ? 'pause' : 'play'}_audio_aria`)
    } ${title}`;

    useEffect(() => {
        const audioElement = audioElementRef.current!;
        const scrubberElement = scrubberElementRef.current!;

        const setScrubberMax = () => {
            scrubberElement.max = audioElement.duration.toString();
        };

        const updateScrubberPosition = () => {
            scrubberElement.value = audioElement.currentTime.toString();
        };

        const updateAudioPosition = () => {
            audioElement.currentTime = Number(scrubberElement.value);
        };

        if (audioElement.readyState >= 1) {
            setScrubberMax();
        } else {
            audioElement.addEventListener('loadedmetadata', setScrubberMax);
        }
        audioElement.addEventListener('timeupdate', updateScrubberPosition);
        scrubberElement.addEventListener('input', updateAudioPosition);

        return () => {
            audioElement.removeEventListener('loadedmetadata', setScrubberMax);
            audioElement.removeEventListener('timeupdate', updateScrubberPosition);
            scrubberElement.removeEventListener('input', updateAudioPosition);
        };
    }, []);

    useEffect(() => {
        if (isPlaying) {
            if (audioElementRef.current!.currentTime === audioElementRef.current!.duration) {
                audioElementRef.current!.currentTime = 0;
            }
            audioElementRef.current!.play();
        } else {
            audioElementRef.current!.pause();
        }
    }, [isPlaying]);

    return (<>
        <div className="flex items-center gap-2 text-2xl text-amber-900 dark:text-amber-200">
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

            {/* eztodo add aria label / a11y everywhere */}
            <input
                ref={scrubberElementRef}
                type="range"
                min="0"
                step="0.1"
                defaultValue={0}
                className="c-audio-player__scrubber"
            />

            {/* audio speed controls */}
            <div className="relative">
                <button
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
