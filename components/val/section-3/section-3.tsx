import ReactMarkdown from 'react-markdown';

import { useI18n } from '@/hooks/useI18n';

const firstParagraphClasses = 'first-letter:text-amber-900 first-letter:text-7xl first-letter:float-left first-letter:font-bold first-letter:mr-3 dark:first-letter:text-amber-200';
const paragraphClasses = 'font-serif dark:text-amber-50 mb-4';

export default function SectionThree() {
    const { t } = useI18n();

    return (
        <div className="w-full bg-white dark:bg-stone-900 p-4 pt-12">
            <div className="m-auto max-w-[1000px]">
                <ReactMarkdown className={`${firstParagraphClasses} ${paragraphClasses}`}>
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
