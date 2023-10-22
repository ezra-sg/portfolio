import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

import img from '@/public/images/val--indian.jpg';

import { useI18n } from '@/hooks/useI18n';


export default function Intro() {
    const { t } = useI18n();

    return (
        <div className="relative w-full h-[100svh] lg:flex lg:flex-row-reverse lg:gap-8 lg:justify-between lg:items-center xl:max-w-[1440px] xl:m-auto xl:px-12">
            <Image
                src={img}
                alt={t('hero.hero_image_alt')}
                priority={true}
                className="h-full w-full object-cover lg:lg-[100svh] lg:w-auto xl:h-[80svh]"
            />

            <div className="absolute bottom-12 left-0 right-0 bg-amber-50 dark:bg-stone-950 py-4 lg:static lg:w-full lg:flex lg:justify-center">
                <div className="lg:w-fit lg:pl-4">
                    <ReactMarkdown className="font-header text-5xl text-amber-900 dark:text-amber-200 text-center lg:text-left">
                        {t('hero.hero_text_md')}
                    </ReactMarkdown>

                    <ReactMarkdown className="mb-4 font-sans dark:text-amber-50 text-center font-semibold lg:text-left">
                        {t('hero.subtitle_md')}
                    </ReactMarkdown>

                    <ReactMarkdown className="font-sans dark:text-amber-50 text-center lg:text-left">
                        {t('hero.author_text_md')}
                    </ReactMarkdown>

                    <ReactMarkdown className="font-sans dark:text-amber-50 text-center lg:text-left text-sm">
                        {t('hero.interview_date_md')}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}
