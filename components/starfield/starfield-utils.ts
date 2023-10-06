import { StarData } from "./starfield-types";
import { sample } from "@/utils/sample";

/**
 * Generate the initial data for a set of stars to fill the screen.
 * @param {number} windowHeight The height of the window in pixels.
 * @param {number} windowWidth The width of the window in pixels.
 * @returns An array of StarData objects.
 */
export function initStars(windowHeight: number, windowWidth: number): StarData[] {
    const paleRed = 'f4e1e1';
    const paleOrange = 'ffd9bc';
    const paleYellow = 'fffde8';
    const paleBlue = 'edfeff';
    const palePurple = 'f7edff';
    const red = 'c93636';
    const orange = 'ff940a'
    const yellow = 'fce00c';
    const blue = '5761f2';
    const violet = '8a66c4';
    const starColors: string[] = [paleRed, paleOrange, paleYellow, paleBlue, palePurple];
    const rareStarColors: string[] = [red, orange, yellow, blue, violet];

    const starsPerPixel = 0.001;
    const screenWidthInPixels = windowWidth;
    const screenHeightInPixels = windowHeight;
    const numberOfStars = Math.ceil(screenWidthInPixels * screenHeightInPixels * starsPerPixel);

    const stars: StarData[] = [];
    for (let i = 0; i < numberOfStars; i++) {
        const rawSize = Math.abs(getRandomNumberGaussian(0.2, 1));
        const size = +(Math.max(rawSize, 0.8).toFixed(2)); // limit to 2 decimal places, and ensure it's at least 0.8
        const color = sample(Math.random() > 0.98 ? rareStarColors : starColors) as string;
        stars.push({
            color,
            size,
            x: Math.random() * windowWidth,
            y: Math.random() * windowHeight,
            parallax: Math.random(),
        });
    }

    return stars;
}

/**
 * Get a random number from a Gaussian distribution.
 * @param {number} mean The mean of the distribution, i.e. the point around which the numbers will be generated.
 * @param {number} standardDeviation The standard deviation of the distribution.
 * @returns A random number.
 */
export function getRandomNumberGaussian(mean: number, standardDeviation: number) {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

    num = num * standardDeviation + mean; // Translate to desired mean and standard deviation

    return num;
}
