import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { setupJestCanvasMock } from 'jest-canvas-mock';

import * as nextNavigation from 'next/navigation';

import Starfield from './starfield';
import { getRandomNumberGaussian } from './starfield-utils';

jest.mock('next/navigation');
const mockedNextNavigation = jest.mocked(nextNavigation);

describe('<Starfield />', () => {
    let savedMatchMedia: ((query: string) => MediaQueryList);
    const matchMediaMock = jest.fn();

    function setMockPrefersReducedMotion(prefersReducedMotion: boolean) {
        matchMediaMock.mockImplementation(() => ({ matches: prefersReducedMotion }));
    }

    function setMockShowFps(shouldShowFps: boolean) {
        mockedNextNavigation.useSearchParams.mockReturnValue(
            {
                get: (key: string) => key === 'fps' ? (shouldShowFps ? 'true' : '') : null
            } as nextNavigation.ReadonlyURLSearchParams
        );
    }

    beforeAll(() => {
        savedMatchMedia = global.window.matchMedia;
        global.window.matchMedia = matchMediaMock;
    });

    beforeEach(() => {
        setupJestCanvasMock();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    afterAll(() => {
        // restore the original matchMedia
        global.window.matchMedia = savedMatchMedia;
    });

    it('should show the FPS meter if it is in the query param', () => {
        setMockPrefersReducedMotion(false);
        setMockShowFps(true);

        render(<Starfield />);

        const fpsMeter = screen.queryByTestId('starfield-fps-meter');
        expect(fpsMeter).toBeInTheDocument();
    });

    it('should not show the FPS meter if it is not in the query param', () => {
        setMockPrefersReducedMotion(false);
        setMockShowFps(false);

        render(<Starfield />);

        const fpsMeter = screen.queryByTestId('starfield-fps-meter');
        expect(fpsMeter).not.toBeInTheDocument();
    });

    it('should not animate if user prefers reduced motion', () => {
        setMockPrefersReducedMotion(true);
        setMockShowFps(true);
        const rafSpy = jest.spyOn(window, 'requestAnimationFrame');

        render(<Starfield />);

        // there should be no FPS meter if the user prefers reduced motion
        const fpsMeter = screen.queryByTestId('starfield-fps-meter');
        expect(fpsMeter).not.toBeInTheDocument();

        // there should be no redraw calls after stars have been drawn intially
        expect(rafSpy).not.toBeCalled();
    });
})

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
