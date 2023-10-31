import { ReactNode, createContext, useContext, useRef, useState } from 'react';

export enum AudioStatus {
    playing = 'playing',
    paused = 'paused',
    stopped = 'stopped',
    complete = 'complete',
    loading = 'loading',
}

type AudioData = {
    snippetId: null | string; // unique ID for each audio snippet
    src: null | string;
    title: null | string;
    transcript: null | string;
};

type AudioContextType = {
    globalPlayer: {
        currentAudioData: AudioData;
        audioPlaybackState: AudioStatus;
        setAudioElementRef: (audioElement: HTMLAudioElement | null) => void;
        setAudioStatus: (status: AudioStatus) => void;
    };

    snippet: {
        playAudio: (
            snippetId: string,
            src: string,
            title: string,
            transcript: string, // markdown string
        ) => void;
        pauseAudio: () => void;

        audioElementRef: HTMLAudioElement | null;

        subscribe: (snippetId: string, callback: (status: AudioStatus) => void) => void;
        unsubscribe: (snippetId: string) => void;
    };
};

export const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
    const [currentAudioData, setCurrentAudioData] = useState<AudioData>({
        src: null,
        snippetId: null,
        title: null,
        transcript: null,
    });
    const [audioPlaybackState, setAudioPlaybackState] = useState<AudioStatus>(AudioStatus.stopped);

    const listeners = useRef<Map<string, (status: AudioStatus) => void>>(new Map());
    const audioElementRef = useRef<HTMLAudioElement | null>(null);

    function playAudio(
        snippetId: string,
        src: string,
        title: string,
        transcript: string,
    ) {
        setCurrentAudioData({
            snippetId,
            src,
            title,
            transcript,
        });
        setAudioStatus(AudioStatus.loading, snippetId);
    }

    function pauseAudio() {
        if (!currentAudioData.snippetId) {
            throw new Error('Cannot pause audio when no snippetId is set');
        }
        setAudioStatus(AudioStatus.paused, currentAudioData.snippetId);
    }

    function setAudioStatus(status: AudioStatus, snippetId: string) {
        if (status === AudioStatus.playing) {
            notifyAllStopped(snippetId);
        } else if (status === AudioStatus.stopped) {
            setCurrentAudioData({
                src: null,
                snippetId: null,
                title: null,
                transcript: null,
            });
        }

        notify(snippetId, status);
        setAudioPlaybackState(status);
    }

    function setAudioElementRef (audioElement: HTMLAudioElement | null) {
        audioElementRef.current = audioElement;
    };

    function subscribe(snippetId: string, callback: (status: AudioStatus) => void) {
        listeners.current.set(snippetId, callback);
    };

    function unsubscribe(snippetId: string) {
        listeners.current.delete(snippetId);
    };

    function notify(snippetId: string, status: AudioStatus) {
        const listener = listeners.current.get(snippetId);
        if (listener) {
            listener(status);
        }
    };

    function notifyAllStopped(except?: string) {
        listeners.current.forEach((listener, snippetId) => {
            if (snippetId !== except) {
                listener(AudioStatus.stopped);
            }
        });
    }

    const providerProps: AudioContextType = {
        globalPlayer: {
            currentAudioData,
            audioPlaybackState,
            setAudioElementRef,
            setAudioStatus,
        },
        snippet: {
            playAudio,
            pauseAudio,
            audioElementRef: audioElementRef.current,
            subscribe,
            unsubscribe,
        },
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
