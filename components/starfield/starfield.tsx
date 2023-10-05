"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { debounce, set } from "lodash-es";
import { StarData } from "./starfield-types";
import { initStars } from "./starfield-utils";
import styles from "./starfield.module.scss";

export default function Starfield() {
    const [fps, setFps] = useState(0); // todo this should only be 165 but is other larger values

    const stars = useRef<StarData[]>([]);
    const frameCount = useRef(0);
    const lastTimeFpsCounter = useRef(Date.now());
    const lastTimeDriftRate = useRef(Date.now());
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const driftFunctionRef = useRef<() => void>();

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
                const vertices = [];
                const innerSize = star.size * 0.5;
                const outerSize = star.size;

                // Calculate vertices for the outer and inner diamonds
                for (let i = 0; i < 8; i++) {
                    const angle = Math.PI / 4 * i;
                    const length = i % 2 === 0 ? outerSize : innerSize;
                    const dx = Math.cos(angle) * length;
                    const dy = Math.sin(angle) * length;
                    vertices.push([star.x + dx, star.y + dy]);
                }

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

    const resetCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        stars.current = initStars(document, window);
    }, [])

    useEffect(() => {
        resetCanvas();
        drift();

        const resizeHandler = debounce(resetCanvas, 100);

        window.addEventListener('resize', resizeHandler);
        window.addEventListener('focus', resizeHandler);

        return () => {
            window.removeEventListener('resize', resizeHandler);
            window.removeEventListener('focus', resizeHandler);
        };
    }, [drift, resetCanvas]);

    return (<>
        <div className={styles.background}></div>
        <div className={styles.fpsCounter}>FPS: {fps}</div>
        <canvas ref={canvasRef} className={styles.starfieldCanvas}></canvas>
    </>);
}
