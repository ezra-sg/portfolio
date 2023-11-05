import { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react';

export enum AudioStatus {
    playing = 'playing',
    paused = 'paused',
    stopped = 'stopped',
    complete = 'complete',
}

type AudioData = {
    snippetId: null | string; // unique ID for each audio snippet
    src: null | string;
    title: null | string;
    transcript: null | string;
};

type AudioContextType = {
    currentAudioData: AudioData;
    audioPlaybackState: AudioStatus;
    setAudioElementRef: (audioElement: HTMLAudioElement | null) => void;
    setAudioStatus: (status: AudioStatus, snippetId?: string | null) => void;

    playAudio: (
        snippetId: string,
        src: string,
        title: string,
        transcript: string, // markdown string
    ) => void;
    pauseAudio: () => void;

    subscribe: (snippetId: string, callback: (status: AudioStatus) => void) => void;
    unsubscribe: (snippetId: string, callback: (status: AudioStatus) => void) => void;

    audioElement: HTMLAudioElement | null;
    audioAnalyser: AnalyserNode | null;
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
    const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
    const [nativeAudioContext, setNativeAudioContext] = useState<AudioContext | null>(null);
    const [audioAnalyser, setAudioAnalyser] = useState<AnalyserNode | null>(null);
    const [mediaSource, setMediaSource] = useState<MediaElementAudioSourceNode | null>(null);

    const mediaElementConnectedToSourceNode = useRef(false);
    const listeners = useRef<Map<string, ((status: AudioStatus) => void)[]>>(new Map());

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
        setAudioStatus(AudioStatus.playing, snippetId);
    }

    function pauseAudio() {
        if (!currentAudioData.snippetId) {
            throw new Error('Cannot pause audio when no snippetId is set');
        }
        setAudioStatus(AudioStatus.paused, currentAudioData.snippetId);
    }

    function setAudioStatus(status: AudioStatus, snippetId?: string | null) {
        if (status === AudioStatus.playing) {
            if (!audioElement) {
                return;
            }

            const audioCtx = nativeAudioContext ?? new window.AudioContext();
            if (!nativeAudioContext) {
                setNativeAudioContext(audioCtx);
            }

            const analyzer = audioAnalyser ?? audioCtx.createAnalyser();
            if (!audioAnalyser) {
                analyzer.fftSize = 2048;
                analyzer.minDecibels = -70;
                analyzer.maxDecibels = -20;
                setAudioAnalyser(analyzer);
            }

            if (!mediaSource && !mediaElementConnectedToSourceNode.current) {
                const mediaSource = audioCtx.createMediaElementSource(audioElement);
                setMediaSource(mediaSource);
                mediaSource.connect(analyzer);
                mediaElementConnectedToSourceNode.current = true;
            }

            analyzer.connect(audioCtx.destination);
        }

        setAudioPlaybackState(status);
    }

    function setAudioElementRef (audioElement: HTMLAudioElement | null) {
        setAudioElement(audioElement);
    };

    function subscribe(snippetId: string, handler: (status: AudioStatus) => void) {
        const handlers = listeners.current.get(snippetId);

        if (!handlers) {
            listeners.current.set(snippetId, [handler]);
            return;
        } else {
            handlers.push(handler);
            return;
        }
    };

    function unsubscribe(snippetId: string, handler: (status: AudioStatus) => void) {
        const handlers = listeners.current.get(snippetId);

        if (!handlers) {
            return;
        }

        const index = handlers.indexOf(handler);
        handlers.splice(index, 1);

        if (handlers.length === 0) {
            listeners.current.delete(snippetId);
        }
    };

    function notify(snippetId: string, status: AudioStatus) {
        const handlers = listeners.current.get(snippetId);
        if (handlers) {
            handlers.forEach((handler) => {
                handler(status);
            });
        }
    };

    function notifyAllStopped(except?: string | null) {
        listeners.current.forEach((handlers, snippetId) => {
            if (snippetId !== except) {
                handlers.forEach((handler) => {
                    handler(AudioStatus.stopped);
                });
            }
        });
    }

    useEffect(() => {
        const { snippetId } = currentAudioData;

        if (snippetId) {
            notifyAllStopped(snippetId);
            notify(snippetId, audioPlaybackState);
        }
    }, [audioPlaybackState, currentAudioData]);

    // eztodo change the shape of these props
    const providerProps: AudioContextType = {
        currentAudioData,
        audioPlaybackState,
        setAudioElementRef,
        setAudioStatus,

        playAudio,
        pauseAudio,
        subscribe,
        unsubscribe,

        audioElement: audioElement,
        audioAnalyser,
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
