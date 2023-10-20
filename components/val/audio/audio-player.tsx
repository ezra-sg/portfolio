import { useEffect, useRef, useState } from 'react';
import {
    MdPlayCircleOutline,
    MdOutlinePauseCircleOutline,
    MdSpeed,
} from 'react-icons/md';

import './audio-player.scss';

export type AudioPlayerProps = {
    src: string;
    labelledBy: string; // the id of the element which describes the audio
};

const playbackSpeedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75];

export default function AudioPlayer({ src, labelledBy }: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showSpeedOptions, setShowSpeedOptions] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);

    const audioElementRef = useRef<HTMLAudioElement | null>(null);
    const scrubberElementRef = useRef<HTMLInputElement | null>(null);

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
            audioElementRef.current!.play();
        } else {
            audioElementRef.current!.pause();
        }
    }, [isPlaying]);

    return (<>
        <div className="flex items-center gap-2 text-2xl text-amber-900">
            {/* eztodo add keydown handler */}
            <button onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? <MdOutlinePauseCircleOutline aria-hidden= "true" /> : <MdPlayCircleOutline aria-hidden="true" />}
            </button>

            {/* eztodo add aria label / a11y everywhere */}
            <input
                ref={scrubberElementRef}
                type="range"
                id="volume"
                min="0"
                step="0.1"
                defaultValue={0}
                className="c-audio-player__scrubber"
            />

            <div className="relative">
                <button
                    onClick={() => setShowSpeedOptions(!showSpeedOptions)}
                >
                    <MdSpeed aria-hidden="true" />
                </button>

                {/* eztodo make hook for clickaway, add here */}
                <ul role="listbox" className="absolute p-3 bg-amber-50 shadow-lg rounded-sm" hidden={!showSpeedOptions}>
                    {playbackSpeedOptions.map((speed, index) => (
                        <li
                            key={`audio-speed-label-${labelledBy}-${index}`}
                            role="listitem"
                            className={`${playbackSpeed === speed ? 'font-bold' : ''} text-sm cursor-pointer my-2 hover:underline`}
                            onClick={() => {
                                audioElementRef.current!.playbackRate = speed;
                                setPlaybackSpeed(speed);
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
        />
    </>);
}
