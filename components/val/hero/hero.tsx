import Image from 'next/image';

import img from '@/public/val--indian.jpg';

import { useI18n } from '@/hooks/useI18n';


export default function Intro() {
    const { t } = useI18n();

    return (
        <div className="relative w-full h-[100svh] md:flex md:flex-row-reverse md:gap-8 md:justify-between md:items-center xl:max-w-[1440px] xl:m-auto xl:px-12 mb-8">
            <Image
                src={img}
                alt={t('hero.hero-image-alt')}
                priority={true}
                className="h-full w-full object-cover md:h-[100svh] xl:h-[80svh] md:w-auto"
            />

            <div className="absolute md:static bottom-12 left-0 right-0 bg-amber-50 dark:bg-slate-950 py-4 md:w-full md:flex md:justify-center">
                <div className="md:w-fit md:pl-4">
                    <h1 className="font-header text-5xl text-amber-900 dark:text-amber-200 text-center md:text-left">
                        {t('hero.hero-text')}
                    </h1>
                    <h2 className="mb-4 font-sans dark:text-amber-50 text-center font-semibold md:text-left">
                        {t('hero.subtitle')}
                    </h2>
                    <p className="font-sans dark:text-amber-50 text-center md:text-left">
                        {t('hero.author-text')}
                        <br />
                        <span className="text-sm">{t('hero.interview-date')}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
