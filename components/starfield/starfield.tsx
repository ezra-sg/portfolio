"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "lodash-es";
import { StarData, VertexCache } from "./starfield-types";
import { initStars } from "./starfield-utils";
import "./starfield.scss";

export default function Starfield() {
    const [fps, setFps] = useState(0);

    const mounted = useRef(false);
    const stars = useRef<StarData[]>([]);
    const vertexMemo = useRef<VertexCache>({});
    const frameCount = useRef(0);
    const lastTimeFpsCounter = useRef(Date.now());
    const lastTimeDriftRate = useRef(Date.now());
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // useRef is used to create a reference to the function so that it can be called recursively
    const driftFunctionRef = useRef<() => void>();

    // create memoization table for storing calculated vertices
    function getVertices (size: number) {
        // If vertices for this size have already been calculated, return them
        if (vertexMemo.current[size]) {
            return vertexMemo.current[size];
        }

        const vertices: Array<[number, number]> = [];
        const innerSize = size * 0.5;
        const outerSize = size;

        for (let i = 0; i < 8; i++) {
            const angle = Math.PI / 4 * i;
            const length = i % 2 === 0 ? outerSize : innerSize;
            const dx = Math.cos(angle) * length;
            const dy = Math.sin(angle) * length;
            vertices.push([dx, dy]);
        }

        // Store the calculated vertices in the memoization table
        vertexMemo.current[size] = vertices;

        return vertices;
    }

    const drawStars = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) {
            return;
        }

        frameCount.current++;
        const currentTime = Date.now();
        const deltaTime = currentTime - lastTimeFpsCounter.current;

        if (deltaTime >= 1000) {
            setFps(frameCount.current);
            frameCount.current = 0;
            lastTimeFpsCounter.current = currentTime;
        }

        const width = canvas.width;
        const height = canvas.height;

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);

        stars.current.forEach((star) => {
            // if the star is large, draw a diamond shape rather than just a dot
            if (star.size > 1) {
                const cachedVertices = getVertices(star.size);
                // vertices have been calculated relative to the origin, so we need to add the star's position to each vertex
                const vertices = cachedVertices.map(vertex => [vertex[0] + star.x, vertex[1] + star.y]);

                ctx.beginPath();

                // Draw the star with curves
                ctx.moveTo(vertices[0][0], vertices[0][1]);
                for (let i = 0; i < vertices.length; i++) {
                    const x1 = vertices[i][0];
                    const y1 = vertices[i][1];
                    const x2 = vertices[(i + 1) % vertices.length][0];
                    const y2 = vertices[(i + 1) % vertices.length][1];
                    const cx = (x1 + x2) / 2;
                    const cy = (y1 + y2) / 2;
                    const cp1x = (cx + x1) / 2;
                    const cp1y = (cy + y1) / 2;
                    const cp2x = (cx + x2) / 2;
                    const cp2y = (cy + y2) / 2;

                    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x2, y2);
                }

                ctx.fillStyle = `#${star.color}`;
                ctx.fill();
            } else {
                ctx.fillStyle = `#${star.color}`;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
                ctx.fill();
            }
        });
    }, [])

    const drift = useCallback(() => {
        const currentTime = Date.now();
        const deltaTime = currentTime - lastTimeDriftRate.current;
        lastTimeDriftRate.current = currentTime;

        const driftRate = 8;
        const adjustedDriftRate = driftRate * (deltaTime / 1000); // ensure drift rate is consistent regardless of frame rate

        stars.current.forEach((star) => {
            star.x += adjustedDriftRate * star.parallax;
            star.y += adjustedDriftRate * star.parallax;

            if (star.x < 0 - star.size) {
                star.x = window.innerWidth - star.size;
            } else if (star.x > window.innerWidth + star.size) {
                star.x = 0 - star.size;
            }

            if (star.y < 0 - star.size) {
                star.y = window.innerHeight - star.size;
            } else if (star.y > window.innerHeight + star.size) {
                star.y = 0 - star.size;
            }
        });

        drawStars();

        if (driftFunctionRef.current) {
            window.requestAnimationFrame(driftFunctionRef.current)
        }

    }, [drawStars]);

    driftFunctionRef.current = drift;

    function resetCanvas() {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }

        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;

        canvas.height = windowHeight;
        canvas.width = windowWidth;

        stars.current = initStars(windowHeight, windowWidth);
    };

    useEffect(() => {
        if (!mounted.current) {
            resetCanvas();
            driftFunctionRef.current?.();
        }
        mounted.current = true;

        const resetCanvasDebounced = debounce(resetCanvas, 100);

        window.addEventListener('resize', resetCanvasDebounced);

        return () => {
            window.removeEventListener('resize', resetCanvasDebounced);
        };
    }, []);

    return (<>
        <div className="c-starfield__background"></div>
        <div className="c-starfield__fps-counter">FPS: {fps}</div>
        <canvas ref={canvasRef} className="c-starfield__canvas"></canvas>
    </>);
}