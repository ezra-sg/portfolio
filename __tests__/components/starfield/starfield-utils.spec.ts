import { initStars, getRandomNumberGaussian } from '@/components/starfield/starfield-utils';

describe('getRandomNumberGaussian', () => {
    it('generates random numbers with a normal distribution', () => {
        const mean = 0;
        const stdDev = 1;
        const numSamples = 10000;
        const samples = Array.from({ length: numSamples }, () => getRandomNumberGaussian(mean, stdDev));
        const meanSample = samples.reduce((sum, sample) => sum + sample, 0) / numSamples;
        const stdDevSample = Math.sqrt(samples.reduce((sum, sample) => sum + (sample - meanSample) ** 2, 0) / numSamples);

        expect(meanSample).toBeCloseTo(mean, 1);
        expect(stdDevSample).toBeCloseTo(stdDev, 1);
    });
});

describe('initStars', () => {
    it('properly initializes star data', () => {
        const windowHeight = 1000;
        const windowWidth = 1000;
        const stars = initStars(windowHeight, windowWidth);

        expect(stars.length).toBeCloseTo(windowHeight * windowWidth * 0.001, 1);
        expect(stars.every(({ x }) => x >= 0 && x <= windowWidth)).toBe(true);
        expect(stars.every(({ y }) => y >= 0 && y <= windowHeight)).toBe(true);
        expect(stars.every(({ size }) => size >= 0.8)).toBe(true);
        expect(stars.every(({ parallax }) => parallax >= 0 && parallax <= 1)).toBe(true);
        expect(stars.every(({ color }) => /^[a-f0-9]{6}$/.test(color))).toBe(true);
    });
});
