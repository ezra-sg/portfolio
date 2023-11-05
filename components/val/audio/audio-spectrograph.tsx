import { useCallback, useEffect, useRef } from 'react';

import { AudioStatus, useAudioContext } from '@/hooks/useAudioContext';

export function AudioSpectrograph({ snippetId }: { snippetId: string }) {
    const isPlaying = useRef(false);
    const audioCtx = useRef<null | AudioContext>();
    const analyser = useRef<null | AnalyserNode>();
    const mediaSource = useRef<null | MediaElementAudioSourceNode>();
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
        // audioCtx.current?.close();
        // mediaSource.current?.disconnect();
        // analyser.current = null;
        // audioCtx.current = null;

        if (animationId.current) {
            // window.cancelAnimationFrame(animationId.current);
        }
    };

    function drawLineOnCanvas(canvas: HTMLCanvasElement) {
        const canvasCtx = canvas?.getContext('2d');

        if (!canvasCtx) {
            return;
        }

        const middleY = Math.floor(canvas.height / 2) + 0.5; // Add 0.5 to align the line on a pixel boundary

        canvasCtx.beginPath(); // Start a new path
        canvasCtx.moveTo(0, middleY); // Move to the start of the line
        canvasCtx.lineTo(canvas.width, middleY); // Draw the line
        canvasCtx.strokeStyle = '#78350f'; // Set the color of the line
        canvasCtx.lineWidth = 1; // Set the line width to 1 pixel
        canvasCtx.stroke(); // Render the line
    }

    const draw = useCallback((analyzer: AnalyserNode, dataArray: Uint8Array) => {
        console.log('draw');

        const canvas = spectrographElementRef.current;
        const canvasCtx = canvas?.getContext('2d');

        if (!canvas || !canvasCtx) {
            return;
        }

        const barWidth = (canvas.width / 24) / 2;

        analyzer.getByteFrequencyData(dataArray);

        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

        drawLineOnCanvas(canvas);

        for (let i = 0; i < 24; i++) {
            const value = dataArray[i]; // Value between 0 and 255
            const percent = value / 255; // Percentage of max height
            const height = canvas.height * percent;
            const barHeight = height / 2;

            // eztodo switch color for dark mode
            canvasCtx.fillStyle = '#78350f';
            canvasCtx.fillRect(i * barWidth * 2, canvas.height/2, barWidth, barHeight);
            // Mirror the bar across the x-axis
            canvasCtx.fillRect(i * barWidth * 2, (canvas.height - barHeight) - (canvas.height / 2), barWidth, barHeight);
        }

        if (isPlaying.current) {
            animationId.current = window.requestAnimationFrame(() => {
                drawFunctionRef.current?.(analyzer, dataArray);
            });
        } else {
            canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
            drawLineOnCanvas(canvas);
        }
    }, []);
    drawFunctionRef.current = draw;

    useEffect(() => {
        drawLineOnCanvas(spectrographElementRef.current!);
    }, []);

    useEffect(() => {
        const {
            playing,
            paused,
            complete,
            stopped,
        } = AudioStatus;

        const handler = (status: AudioStatus) => {
            isPlaying.current = status === playing;

            if (status === playing && audioElement && spectrographElementRef.current) {
                if (!audioCtx.current) {
                    audioCtx.current = new window.AudioContext();
                }

                if (!analyser.current) {
                    analyser.current = audioCtx.current.createAnalyser();
                }

                const analyzer = analyser.current;
                const context = audioCtx.current;

                analyzer.fftSize = 2048;
                analyzer.minDecibels = -70;
                analyzer.maxDecibels = -10;

                if (!mediaSource.current) {
                    mediaSource.current = context.createMediaElementSource(audioElement);
                    mediaSource.current.connect(analyzer);
                }
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

    return <canvas ref={spectrographElementRef} className="w-40"></canvas>;
}
