<script>
    import { onMount } from 'svelte';
    import { debounce } from 'lodash-es';
    import { getDPI, getRandomNumberGaussian } from '$lib/utils';

    let fps = 0;
    let frameCount = 0;
    let lastTimeFpsCounter = Date.now();
    let lastTimeDriftRate = Date.now();

    let canvas;
    let stars = [];
    const starColors = ['f4e1e1', 'ffd9bc', 'fffde8', 'edfeff', 'edf1ff', 'f7edff', 'ffffff']

    onMount(() => {
        initStars();
        resetCanvas();
        drift();

        const resizeHandler = debounce(resetCanvas, 100);

        window.addEventListener('resize', resizeHandler);
        window.addEventListener('focus', resizeHandler);

        return () => {
            window.removeEventListener('resize', resizeHandler);
            window.removeEventListener('focus', resizeHandler);
        };
    });

    function initStars() {
        const starsPerInch = 10;
        const dpi = getDPI();
        const numberOfStars = starsPerInch * dpi;

        stars = [];
        for (let i = 0; i < numberOfStars; i++) {
            const rawSize = Math.abs(getRandomNumberGaussian(0.2, 1));
            const size = Math.max(rawSize, 0.8);
            stars.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                color: starColors[Math.floor(Math.random() * starColors.length)],
                size,
                parallax: Math.random(),
            });
        }
    }

    function resetCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        initStars();
    }

    function drift() {
        const currentTime = Date.now();
        const deltaTime = currentTime - lastTimeDriftRate;
        lastTimeDriftRate = currentTime;

        const driftRate = 8;
        const adjustedDriftRate = driftRate * (deltaTime / 1000); // ensure drift rate is consistent regardless of frame rate

        stars.forEach((star) => {
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

        window.requestAnimationFrame(drift)
    }

    function drawStars() {
        frameCount++;
        const currentTime = Date.now();
        const deltaTime = currentTime - lastTimeFpsCounter;

        if (deltaTime >= 1000) {
            fps = frameCount;
            frameCount = 0;
            lastTimeFpsCounter = currentTime;
        }

        const width = canvas.width;
        const height = canvas.height;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);

        stars.forEach((star) => {
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
    }
</script>

<div class="fps-counter">FPS: {fps}</div>
<canvas bind:this={canvas}></canvas>

<style>
.fps-counter {
    color: rgb(103, 246, 103);
    position: fixed;
    top: 16px;
    left: 16px;
    z-index: 9999;
}
canvas {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
</style>
