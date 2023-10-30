import { useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import { MdReadMore } from 'react-icons/md';

import { useAudioContext } from '@/hooks/useAudioContext';
import { useI18n } from '@/hooks/useI18n';


import AudioPlayer from '@/components/val/audio/global-audio-player';


export default function AudioBanner() {
    const { currentAudioData: audioState } = useAudioContext();
    const { t } = useI18n();

    if (!audioState) {
        throw new Error('AudioBanner must be rendered within an AudioProvider');
    }

    // if (!audioState?.src || !audioState?.title) {
    //     return null;
    // }

    return (
        // eztodo add aria label
        <div role="region" className="fixed top-0 right-0 left-0 h-fit py-2 px-4 bg-amber-50 shadow-sm z-50 flex items-center justify-center flex-col dark:bg-stone-950">
            {/* <h3 id="audio-banner-title">{audioState?.title}</h3> */}
            <h3 id="audio-banner-title" className="font-header text-sm">Ezra tests some audio</h3>

            <AudioPlayer labelledBy="audio-banner-title" />

            <div className="flex gap-2 items-center justify-center text-amber-900 dark:text-orange-300">
                <MdReadMore />

                <ReactMarkdown className="text-xs">
                    {t('global.view_transcript_md')}
                </ReactMarkdown>
            </div>
        </div>
    );
}
