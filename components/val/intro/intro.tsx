import ReactMarkdown from 'react-markdown';

import { useI18n } from '@/hooks/useI18n';

const firstParagraphClasses = {
    general: 'font-serif dark:text-amber-50 mb-4',
    firstLetter: 'first-letter:text-amber-900 first-letter:text-7xl first-letter:float-left first-letter:font-bold first-letter:mr-3 dark:first-letter:text-amber-200',
};

export default function Intro() {
    const { t } = useI18n();

    return (
        <div className="w-full bg-white dark:bg-slate-950 p-4 pt-12">
            <ReactMarkdown className={`${firstParagraphClasses.general} ${firstParagraphClasses.firstLetter}`}>
                {t('intro.paragraph_1')}
            </ReactMarkdown>

            <p className="font-serif dark:text-amber-50"></p>
        </div>
    );
}
