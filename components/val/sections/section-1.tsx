import ReactMarkdown from 'react-markdown';

import { useI18n } from '@/hooks/useI18n';
import AudioSnippet from '../audio/audio-snippet';

const paragraphClasses = 'font-serif mb-4 dark:text-white';

export default function SectionOne() {
    const { t } = useI18n();

    return (
        <div className="w-full bg-white dark:bg-stone-900 p-4">
            <div className="m-auto max-w-[1000px]">
                <h2 className="text-3xl font-header mb-4 dark:text-white">Part I: &quot;Guy&quot;</h2>

                <AudioSnippet src="/audio/intro.m4a" title="Ezra tests some audio" transcript="test" />
                <AudioSnippet src="/audio/test-2.m4a" title="Test #2" transcript="test" />

                <ReactMarkdown className={`${paragraphClasses}`}>
                    {t('val.section_1.paragraph_1_md')}
                </ReactMarkdown>

                <ReactMarkdown className={`${paragraphClasses} first-letter:ml-8`}>
                    {t('val.section_1.paragraph_2_md')}
                </ReactMarkdown>

                <ReactMarkdown className={`${paragraphClasses} first-letter:ml-8`}>
                    {t('val.section_1.paragraph_3_md')}
                </ReactMarkdown>

                <ReactMarkdown className={`${paragraphClasses} first-letter:ml-8`}>
                    {t('val.section_1.paragraph_4_md')}
                </ReactMarkdown>

                <ReactMarkdown className={`${paragraphClasses} first-letter:ml-8`}>
                    {t('val.section_1.paragraph_5_md')}
                </ReactMarkdown>

                <ReactMarkdown className={`${paragraphClasses} first-letter:ml-8`}>
                    {t('val.section_1.paragraph_6_md')}
                </ReactMarkdown>
            </div>
        </div>
    );
}
