import { useCallback, useEffect, useRef } from 'react';

import { AudioStatus, useAudioContext } from '@/hooks/useAudioContext';

export function AudioSpectrograph({ snippetId }: { snippetId: string }) {
    const audioCtx = useRef<null | AudioContext>();
    const analyser = useRef<null | AnalyserNode>();
    const animationId = useRef<null | number>();
    const spectrographElementRef = useRef<HTMLCanvasElement | null>(null);
    const drawFunctionRef = useRef<null | ((analyzer: AnalyserNode, dataArray: Uint8Array) => void)>(null);

    const {
        snippet: {
            audioElement,
            subscribe,
            unsubscribe,
        },
    } = useAudioContext();

    function cleanup() {
        audioCtx.current?.close();
        analyser.current = null;
        audioCtx.current = null;

        if (animationId.current) {
            window.cancelAnimationFrame(animationId.current);
        }
    };

    const draw = useCallback((analyzer: AnalyserNode, dataArray: Uint8Array) => {
        const canvas = spectrographElementRef.current;
        const canvasCtx = canvas?.getContext('2d');

        if (!canvas || !canvasCtx) {
            return;
        }

        const barWidth = (canvas.width / 24) / 2;

        analyzer.getByteFrequencyData(dataArray);

        canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < 24; i++) {
            const value = dataArray[i]; // Value between 0 and 255
            const percent = value / 255; // Percentage of max height
            const height = canvas.height * percent;
            const offset = canvas.height - height - 1;
            const barHeight = height / 2;

            canvasCtx.fillStyle = 'rgb(' + (value + 100) + ',50,50)';
            canvasCtx.fillRect(i * barWidth * 2, offset, barWidth, barHeight);
            // Mirror the bar across the x-axis
            canvasCtx.fillRect(i * barWidth * 2, canvas.height - offset - barHeight, barWidth, barHeight);
        }

        animationId.current = requestAnimationFrame(() => drawFunctionRef.current?.(analyzer, dataArray));
    }, []);
    drawFunctionRef.current = draw;

    useEffect(() => {
        const {
            playing,
            paused,
            complete,
            stopped,
        } = AudioStatus;

        const handler = (status: AudioStatus) => {
            if (status === playing && audioElement && spectrographElementRef.current) {
                audioCtx.current = new window.AudioContext();
                analyser.current = audioCtx.current.createAnalyser();

                const analyzer = analyser.current;
                const context = audioCtx.current;

                analyzer.fftSize = 2048;
                analyzer.minDecibels = -90;
                analyzer.maxDecibels = -10;

                const source = context.createMediaElementSource(audioElement);
                source.connect(analyzer);
                analyzer.connect(context.destination);

                const bufferLength = analyzer.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);
                drawFunctionRef.current?.(analyzer, dataArray);
            } else if ([paused, complete, complete, stopped].includes(status)) {
                cleanup();
            }
        };

        subscribe(snippetId, handler);

        return () => {
            unsubscribe(snippetId, handler);
            cleanup();
        };
    }, [audioElement, subscribe, unsubscribe, snippetId]);

    return <canvas ref={spectrographElementRef}></canvas>;
}
