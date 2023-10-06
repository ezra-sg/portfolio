import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import * as nextNavigation from 'next/navigation';

import Starfield from './starfield';

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

    it('should not show the FPS meter if user prefers reduced motion', () => {
        setMockPrefersReducedMotion(true);
        setMockShowFps(true);

        render(<Starfield />);

        const fpsMeter = screen.queryByTestId('starfield-fps-meter');
        expect(fpsMeter).not.toBeInTheDocument();
    });
})
