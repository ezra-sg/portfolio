import ReactMarkdown from 'react-markdown';

import { useI18n } from '@/hooks/useI18n';

const paragraphClasses = 'font-serif mb-4 dark:text-white';

export default function SectionThree() {
    const { t } = useI18n();

    return (
        <div className="w-full bg-white dark:bg-stone-900 p-4">
            <div className="m-auto max-w-[1000px]">
                <h2 className="text-3xl font-header mb-4 dark:text-white">Part III: Snoopy</h2>

                <ReactMarkdown className={`${paragraphClasses}`}>
                    {t('val.section_3.paragraph_1_md')}
                </ReactMarkdown>

                <ReactMarkdown className={`${paragraphClasses} first-letter:ml-8`}>
                    {t('val.section_3.paragraph_2_md')}
                </ReactMarkdown>

                <ReactMarkdown className={`${paragraphClasses} first-letter:ml-8`}>
                    {t('val.section_3.paragraph_3_md')}
                </ReactMarkdown>

                <ReactMarkdown className={`${paragraphClasses} first-letter:ml-8`}>
                    {t('val.section_3.paragraph_4_md')}
                </ReactMarkdown>

                <ReactMarkdown className={`${paragraphClasses} first-letter:ml-8`}>
                    {t('val.section_3.paragraph_5_md')}
                </ReactMarkdown>

                <ReactMarkdown className={`${paragraphClasses} first-letter:ml-8`}>
                    {t('val.section_3.paragraph_6_md')}
                </ReactMarkdown>
            </div>
        </div>
    );
}
