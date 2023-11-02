import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import {
    MdPlayCircleOutline,
    MdOutlinePauseCircleOutline,
    MdSpeed,
    MdRestartAlt,
} from 'react-icons/md';

import './global-audio-player.scss';

import { useI18n } from '@/hooks/useI18n';
import { AudioStatus, useAudioContext } from '@/hooks/useAudioContext';
import { prettyPrintTimestamp } from '@/utils/text-utils';

export type AudioPlayerProps = {
    labelledBy: string; // the id of the element which describes the audio
};

export const playbackSpeedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75];

export default function AudioPlayer({ labelledBy }: AudioPlayerProps) {
    const [showPlaybackSpeedOptions, setShowSpeedOptions] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [showRestartIcon, setShowRestartIcon] = useState(false);
    const [audioTime, setAudioTime] = useState(0);
    const [totalAudioTime, setTotalAudioTime] = useState(0);

    const audioElementRef = useRef<HTMLAudioElement | null>(null);
    const scrubberElementRef = useRef<HTMLInputElement | null>(null);
    const playbackSpeedMenuRef = useRef<HTMLUListElement | null>(null);
    const playbackSpeedButtonRef = useRef<HTMLButtonElement | null>(null);
    const playbackSpeedClickawayHandlerRef = useRef<null | ((event: MouseEvent) => void)>(null);
    const documentHasClickawayListener = useRef(false);
    const isLoaded = useRef(false);
    const audioId = useRef<string | null>(null);
    const setStateToStoppedTimeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

    const { t } = useI18n();

    const {
        globalPlayer: {
            currentAudioData,
            audioPlaybackState,
            setAudioElementRef,
            setAudioStatus,
        },
        snippet: {
            audioElementRef: contextAudioElementRef,
        },
    } = useAudioContext();

    const isPlaying = audioPlaybackState === AudioStatus.playing;

    if (contextAudioElementRef !== audioElementRef.current) {
        setAudioElementRef(audioElementRef.current);
    }

    const playButtonAriaLabel = `${
        showRestartIcon ? t('inputs.restart_audio_aria') : t(`inputs.${isPlaying ? 'pause' : 'play'}_audio_aria`)
    } ${currentAudioData.title}`;

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

        if (audioId.current !== currentAudioData.snippetId) {
            audioId.current = currentAudioData.snippetId;

            audioElement.src = currentAudioData.src ?? '';
            audioElement.load();
        }
    }, [currentAudioData]);

    useEffect(() => {
        const audioElement = audioElementRef.current!;

        if (setStateToStoppedTimeoutId.current) {
            clearTimeout(setStateToStoppedTimeoutId.current);
            setStateToStoppedTimeoutId.current = null;
        }

        if (audioPlaybackState === AudioStatus.playing) {
            if (audioElement.currentTime === audioElement.duration) {
                // restart audio
                audioElement.currentTime = 0;
            }
            if (isLoaded.current) {
                audioElement.play();
            }
        } else if (audioPlaybackState === AudioStatus.paused) {
            audioElement.pause();
        } else if (audioPlaybackState === AudioStatus.stopped) {

        } else if (audioPlaybackState === AudioStatus.complete) {
            setStateToStoppedTimeoutId.current = setTimeout(() => {
                setAudioStatus(AudioStatus.stopped, currentAudioData.snippetId);
            }, 5000);
        }

    }, [audioPlaybackState, setAudioStatus, currentAudioData]);

    useEffect(() => {
        const unregisterDocumentClickawayListener = () => {
            if (documentHasClickawayListener.current) {
                document.removeEventListener('mousedown', playbackSpeedClickawayHandlerRef.current!);
                documentHasClickawayListener.current = false;
            }
        };

        if (showPlaybackSpeedOptions) {
            if (!documentHasClickawayListener.current) {
                document.addEventListener('mousedown', playbackSpeedClickawayHandlerRef.current!);
                documentHasClickawayListener.current = true;
            }
        } else {
            unregisterDocumentClickawayListener();
        }

        return () => {
            unregisterDocumentClickawayListener();
        };
    }, [showPlaybackSpeedOptions]);

    return (<>
        <div className="flex items-center gap-2 text-2xl w-full text-amber-900 dark:text-orange-300">
            {/* play/pause button */}
            <button
                onClick={() => {
                    const newAudioStatus = isPlaying ? AudioStatus.paused : AudioStatus.playing;
                    setAudioStatus(newAudioStatus, currentAudioData.snippetId);
                    setShowRestartIcon(false);
                }}
                onKeyDown={(event) => {
                    if([' ', 'Enter'].includes(event.key)) {
                        event.preventDefault();
                        setAudioStatus(AudioStatus.paused, currentAudioData.snippetId);
                        setShowRestartIcon(false);
                    }
                }}
                aria-label={playButtonAriaLabel}
                title={playButtonAriaLabel}
                className="h-10 w-10 flex items-center justify-center flex-shrink-0"
                data-testid="audio-player-play-button"
            >
                {
                    isPlaying ?
                        <MdOutlinePauseCircleOutline aria-hidden= "true" /> :
                        (showRestartIcon ? <MdRestartAlt aria-hidden="true" /> : <MdPlayCircleOutline aria-hidden="true" />)
                }
            </button>

            {/* time elapsed */}
            <code className="text-xs" title={`${t('inputs.audio_time_elapsed_title')} ${currentAudioData.title}`}>
                {audioTimePretty}
            </code>

            {/* audio scrubber */}
            <input
                ref={scrubberElementRef}
                type="range"
                min="0"
                step="0.1"
                defaultValue={0}
                aria-label={`${t('inputs.audio_scrubber_aria')} ${currentAudioData.title}`}
                className="c-audio-player__scrubber"
            />

            {/* total audio time */}
            <code className="text-xs" title={`${t('inputs.audio_time_total_title')} ${currentAudioData.title}`}>
                {prettyTotalAudioTime}
            </code>

            {/* audio speed controls */}
            <div className="relative">
                <button
                    ref={playbackSpeedButtonRef}
                    aria-label={`${t('inputs.change_playback_speed_aria')} ${currentAudioData.title}`}
                    title={`${t('inputs.change_playback_speed_aria')} ${currentAudioData.title}`}
                    data-testid="audio-player-speed-button"
                    onClick={() => setShowSpeedOptions(!showPlaybackSpeedOptions)}
                    onKeyDown={(event) => {
                        if ([' ', 'Enter'].includes(event.key)) {
                            event.preventDefault();
                            setShowSpeedOptions(!showPlaybackSpeedOptions);
                        }
                    }}
                    className="h-10 w-10 flex items-center justify-center"
                >
                    <MdSpeed aria-hidden="true" />
                </button>

                <ul
                    ref={playbackSpeedMenuRef}
                    role="menu"
                    className="absolute p-3 bg-amber-50 shadow-lg rounded-sm border-[1px] border-amber-900 dark:bg-stone-950 dark:border-orange-300"
                    hidden={!showPlaybackSpeedOptions}
                    aria-hidden={!showPlaybackSpeedOptions}
                    aria-label={`${t('inputs.audio_speed_menu_label')} ${currentAudioData.title}`}
                    data-testid="audio-player-speed-menu"
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
                            data-testid={`audio-player-speed-option-${index}`}
                            onClick={() => {
                                audioElementRef.current!.playbackRate = speed;
                                setPlaybackSpeed(speed);
                                setShowSpeedOptions(false);
                            }}
                            onKeyDown={(event) => {
                                if ([' ', 'Enter'].includes(event.key)) {
                                    event.preventDefault();
                                    audioElementRef.current!.playbackRate = speed;
                                    setPlaybackSpeed(speed);
                                    setShowSpeedOptions(false);
                                }
                            }}
                        >
                            {speed === 1 ? t('global.normal') : `${speed}x`}
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        <audio
            ref={audioElementRef}
            controls
            src={currentAudioData.src ?? undefined}
            aria-labelledby={labelledBy}
            hidden
            data-testid="audio-player-audio-element"
            onEnded={() => {
                setAudioStatus(AudioStatus.complete, currentAudioData.snippetId);
                setShowRestartIcon(true);
            }}
            onLoadStart={() => {
                isLoaded.current = false;
            }}
            onLoadedMetadata={() => {
                isLoaded.current = true;

                if (isPlaying) {
                    audioElementRef.current!.play();
                }
            }}
        />
    </>);
}
