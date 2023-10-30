import { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react';

export type AudioStatus = 'playing' | 'paused' | 'stopped' | 'complete' | 'loading';
export enum AudioStatuses {
    playing = 'playing',
    paused = 'paused',
    stopped = 'stopped',
    complete = 'complete',
    loading = 'loading',
}

type AudioData = {
    src: null | string;
    audioId: null | string; // unique ID for each audio snippet
    title: null | string;
    transcript: null | string;
};

type AudioContextType = {
    showGlobalAudioPlayer: boolean;

    currentAudioData: AudioData;
    loadAudioData: (src: string, audioId: string, title: string, transcript: string) => void;
    clearAudioData: () => void;

    audioPlaybackState: AudioStatus;
    setAudioPlaybackState: (state: AudioStatus) => void;

    setAudioElementRef: (audioElement: HTMLAudioElement | null) => void;
    audioElementRef: HTMLAudioElement | null;

    subscribe: (audioId: string, callback: (status: AudioStatus) => void) => void;
    unsubscribe: (audioId: string) => void;
    notify: (audioId: string, status: AudioStatus) => void;
};

export const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
    const [showGlobalAudioPlayer, setShowGlobalAudioPlayer] = useState(false);
    const [currentAudioData, setAudioState] = useState<AudioData>({
        src: null,
        audioId: null,
        title: null,
        transcript: null,
    });
    const [audioPlaybackState, setAudioPlaybackState] = useState<AudioStatus>(AudioStatuses.stopped);

    const listeners = useRef<Map<string, (status: AudioStatus) => void>>(new Map());
    const audioElementRef = useRef<HTMLAudioElement | null>(null);

    const setAudioElementRef = (audioElement: HTMLAudioElement | null) => {
        audioElementRef.current = audioElement;
    };


    const subscribe = (audioId: string, callback: (status: AudioStatus) => void) => {
        listeners.current.set(audioId, callback);
    };

    const unsubscribe = (audioId: string) => {
        listeners.current.delete(audioId);
    };

    const notify = (audioId: string, status: AudioStatus) => {
        const listener = listeners.current.get(audioId);
        if (listener) {
            listener(status);
        }
    };

    function notifyAllStopped(except?: string) {
        listeners.current.forEach((listener, audioId) => {
            if (audioId !== except) {
                listener(AudioStatuses.stopped);
            }
        });
    }



    const loadAudioData = (src: string, audioId: string, title: string, transcript: string) => {
        setAudioState({
            src,
            audioId,
            title,
            transcript,
        });
        setAudioIsPlaying(true);
    };

    const clearAudioData = () => {
        setAudioState({
            src: null,
            audioId: null,
            title: null,
            transcript: null,
        });
        setAudioIsPlaying(false);
    };

    useEffect(() => {
        if (!currentAudioData.audioId) {
            return;
        }
        notifyAllStopped(currentAudioData.audioId);
        notify(currentAudioData.audioId, AudioStatuses.loading);
    }, [currentAudioData]);

    useEffect(() => {
        let hidePlayerTimeoutId: ReturnType<typeof setTimeout> | null = null;

        if (audioPlaybackState === AudioStatuses.complete) {
            // a few seconds after audio completes, hide the player
            hidePlayerTimeoutId = setTimeout(() => {
                setShowGlobalAudioPlayer(false);
            }, 3000);
        }

        return () => {
            if (hidePlayerTimeoutId) {
                clearTimeout(hidePlayerTimeoutId);
            }
        };
    }, [audioPlaybackState]);

    const providerProps = {
        showGlobalAudioPlayer,

        currentAudioData,
        loadAudioData,
        clearAudioData,

        audioPlaybackState,
        setAudioPlaybackState,

        setAudioElementRef,
        audioElementRef: audioElementRef.current,

        subscribe,
        unsubscribe,
        notify,
    };

    return (
        <AudioContext.Provider value={providerProps}>
            { children }
        </AudioContext.Provider>
    );
}

export function useAudioContext() {
    const context = useContext(AudioContext);

    if (!context) {
        throw new Error('useAudioContext must be used within an AudioProvider');
    }

    return context;
}
