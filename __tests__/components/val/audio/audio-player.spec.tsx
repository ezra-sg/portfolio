import { act, fireEvent } from '@testing-library/react';

import AudioPlayer, { playbackSpeedOptions } from '@/components/val/audio/audio-player';
import { renderWithLanguage } from '@/__tests__/testing-helpers';

jest.mock('react-icons/md', () => ({
    MdPlayCircleOutline: () => <div>play circle outline</div>,
    MdOutlinePauseCircleOutline: () => <div>pause circle outline</div>,
    MdSpeed: () => <div>speed</div>,
    MdRestartAlt: () => <div>restart alt</div>,
}));

describe('AudioPlayer', () => {
    const pauseAudioSpy = jest.fn();
    const playAudioSpy = jest.fn();

    const AudioPlayerNode = (
        <AudioPlayer
            src="src text"
            labelledBy="labelled by text"
            title="title text"
        />
    );

    beforeAll(() => {
        // address error "Not implemented: HTMLMediaElement.prototype.[pause/play]"
        jest.spyOn(window.HTMLMediaElement.prototype, 'pause')
            .mockImplementation(pauseAudioSpy);
        jest.spyOn(window.HTMLMediaElement.prototype, 'play')
            .mockImplementation(playAudioSpy);
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('should change states depending on whether the audio is playing, paused, or finished', () => {
        const result = renderWithLanguage(AudioPlayerNode);

        // the 'play' icon should be visible
        expect(result.container).toMatchSnapshot();

        const playButton = result.queryByTestId('audio-player-play-button');
        expect(playButton).toBeInTheDocument();

        act(() => {
            fireEvent.click(playButton!);
        });

        // the 'pause' icon should be visible
        expect(result.container).toMatchSnapshot();

        const audioElement = result.queryByTestId('audio-player-audio-element');
        expect(audioElement).toBeInTheDocument();

        act(() => {
            fireEvent.ended(audioElement!);
        });

        // the 'restart' icon should be visible
        expect(result.container).toMatchSnapshot();
    });

    it('the audio speed menu should work', () => {
        jest.spyOn(document, 'addEventListener');
        jest.spyOn(document, 'removeEventListener');
        const result = renderWithLanguage(AudioPlayerNode);

        // event listener should only be added when the playback speed menu is open
        expect(document.addEventListener).toHaveBeenCalledTimes(0);

        // the playback speed should be 1x by default
        const audioElement = result.queryByTestId('audio-player-audio-element') as HTMLAudioElement;
        expect(audioElement.playbackRate).toBe(1);

        // the playback speed menu should be hidden by default
        const speedMenu = result.queryByTestId('audio-player-speed-menu');
        expect(speedMenu).toBeInTheDocument();
        expect(speedMenu).toHaveAttribute('hidden');

        // open the playback speed menu
        const speedButton = result.queryByTestId('audio-player-speed-button');
        act(() => {
            fireEvent.click(speedButton!);
        });

        expect(speedMenu).not.toHaveAttribute('hidden');

        // clickaway handler should be added to the document when the menu is open
        expect(document.addEventListener).toHaveBeenCalledTimes(1);
        const clickawayHandler = (document.addEventListener as jest.Mock).mock.calls[0][1];

        const speedOptionOne = result.queryByTestId('audio-player-speed-option-0');
        expect(speedOptionOne).toBeInTheDocument();
        act(() => {
            // click the first playback speed option
            fireEvent.click(speedOptionOne!);
        });

        // the playback speed should be updated
        expect(audioElement.playbackRate).toBe(playbackSpeedOptions[0]);
        expect(speedMenu).toHaveAttribute('hidden'); // selecting an option should close the menu
        expect(document.removeEventListener).toHaveBeenCalledTimes(1); // clickaway handler should be removed when the menu is closed

        // re-open the playback speed menu
        act(() => {
            fireEvent.click(speedButton!);
        });

        act(() => {
            // fireEvent/userEvent.click on the document doesn't trigger event handlers
            // so we need to call the handler directly to simulate a click outside the menu
            clickawayHandler({ target: document.body });
        });

        // the playback speed menu should be hidden on clickaway
        expect(speedMenu).toHaveAttribute('hidden');
        expect(document.removeEventListener).toHaveBeenCalledTimes(2);
        expect(document.removeEventListener).toHaveBeenCalledWith('mousedown', clickawayHandler);
    });
});
