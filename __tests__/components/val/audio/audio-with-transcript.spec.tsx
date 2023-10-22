import { renderWithLanguage } from '@/__tests__/testing-helpers';

import AudioWithTranscript from '@/components/val/audio/audio-with-transcript';

jest.mock('react-markdown', () => (
    function ReactMarkdown({ children }: { children: string }) {
        return <div>{children}</div>;
    })
);
jest.mock('@/components/val/modal/modal', () => (
    function Modal({ children }: { children: string }) {
        return <div>{children}</div>;
    })
);
jest.mock('@/components/val/audio/audio-player', () => (
    function AudioPlayer({ children }: { children: string }) {
        return <div>{children}</div>;
    })
);

describe('AudioWithTranscript', () => {
    it('should render properly', () => {
        const result = renderWithLanguage((
            <AudioWithTranscript
                description="description text"
                title="title text"
                transcript={['transcript text', 'transcript text 2']}
                src="src text"
            />
        ));

        expect(result.container).toMatchSnapshot();
    });
});
