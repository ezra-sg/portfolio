import Image from 'next/image';

import img from '@/public/images/val--indian.webp';

import { useI18n } from '@/hooks/useI18n';


export default function Hero() {
    const { t } = useI18n();

    return (
        <div className="relative w-full h-[100svh] lg:flex lg:flex-row-reverse lg:gap-8 lg:justify-between lg:items-center xl:max-w-[1440px] xl:m-auto xl:px-12">
            <Image
                src={img}
                alt={t('val.hero.hero_image_alt')}
                priority={true}
                className="h-full w-full object-cover lg:lg-[100svh] lg:w-auto xl:h-[80svh]"
            />

            <div className="absolute bottom-12 left-0 right-0 bg-amber-50 dark:bg-stone-950 py-4 lg:static lg:w-full lg:flex lg:justify-center">
                <hgroup className="lg:w-fit lg:pl-4">
                    <h1 className="font-header text-5xl text-amber-900 dark:text-orange-300 text-center lg:text-left">
                        {t('val.hero.hero_text')}
                    </h1>

                    <h2 className="mb-4 font-sans dark:text-amber-50 text-center font-semibold lg:text-left">
                        {t('val.hero.subtitle')}
                    </h2>

                    <p className="font-sans dark:text-amber-50 text-center lg:text-left">
                        {t('val.hero.author_text')}
                    </p>

                    <p className="font-sans dark:text-amber-50 text-center lg:text-left text-sm">
                        {t('val.hero.interview_date')}
                    </p>
                </hgroup>
            </div>
        </div>
    );
}
