import { useEffect, useRef, useState } from 'react';
import {
    MdPlayCircleOutline,
    MdOutlinePauseCircleOutline,
    MdOutlineVolumeUp,
    MdSpeed,
} from 'react-icons/md';

import './audio-player.scss';

export type AudioPlayerProps = {
    src: string;
    labelledBy: string; // the id of the element which describes the audio
};

export default function AudioPlayer({ src, labelledBy }: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
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
        if (!audioElementRef.current) {
            return;
        }

        if (isPlaying) {
            audioElementRef.current.play();
        } else {
            audioElementRef.current.pause();
        }
    }, [isPlaying]);

    return (<>
        <div className="flex items-center gap-2 text-2xl text-amber-900">
            {/* eztodo add keydown handler */}
            <div onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? <MdOutlinePauseCircleOutline aria-hidden= "true" /> : <MdPlayCircleOutline aria-hidden="true" />}
            </div>

            {/* eztodo add aria label */}
            <input
                ref={scrubberElementRef}
                type="range"
                id="volume"
                min="0"
                step="0.1"
                defaultValue={0}
                className="c-audio-player__scrubber"
            />

            <MdOutlineVolumeUp />

            <MdSpeed />
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
