import ReactMarkdown from 'react-markdown';
import { MdReadMore } from 'react-icons/md';

import { useI18n } from '@/hooks/useI18n';

import Modal from '@/components/val/modal/modal';

export type AudioWithTranscriptProps = {
    description: string; // a short description of the audio
    title: string; // the title of the audio
    transcript: string[]; // array of markdown string paragraphs which make up the transcript
    src: string;
};

export default function AudioWithTranscript({ description, title, transcript, src }: AudioWithTranscriptProps) {
    const { t } = useI18n();

    const titleId = `audio-title--${title.replaceAll(' ', '-')}`;

    const modalTrigger = (
        <div className="flex gap-2 items-center justify-center text-amber-900 dark:text-amber-200">
            <MdReadMore />

            <ReactMarkdown className="text-sm">
                {t('global.view_transcript')}
            </ReactMarkdown>
        </div>
    );

    const shapedDescription = `${t('global.open_transcript_modal')} ${description}`;

    function getKeyFromParagraph(paragraph: string) {
        return paragraph.substring(0, 50).replaceAll(' ', '-');
    }

    return (
        <div className="flex justify-center items-center flex-col gap-2">
            <h3 id={titleId} className="font-header dark:text-amber-50" aria-hidden={true}>
                {title}
            </h3>

            <audio controls src={src} aria-labelledby={titleId} />

            <Modal trigger={modalTrigger} description={shapedDescription} title={title}>
                {transcript.map((paragraph, index) => (
                    <ReactMarkdown
                        key={getKeyFromParagraph(paragraph)}
                        className={`mb-4 ${index > 0 ? 'first-letter:ml-4' : ''}`}
                    >
                        {paragraph}
                    </ReactMarkdown>
                ))}
            </Modal>
        </div>
    );
}