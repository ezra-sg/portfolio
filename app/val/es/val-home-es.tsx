'use client';

import ValHome from '@/components/val/home/val-home';
import { LanguageContext } from '@/hooks/useLanguageContext';
import { RawTranslations, SupportedLanguages } from '@/types/i18n-types';

export default function ValHomeEs({ translations }: { translations: RawTranslations }) {
    return (
        <LanguageContext.Provider value={{ language: SupportedLanguages.spanish, translations }}>
            <ValHome />
        </LanguageContext.Provider>
    );
}
