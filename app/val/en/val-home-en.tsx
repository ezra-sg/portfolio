'use client';

import ValHome from '@/components/val/home/val-home';
import { LanguageContext } from '@/hooks/useLanguageContext';
import { SupportedLanguages } from '@/types/i18n-types';

export default function ValHomeEn({ translations }: { translations: Record<string, string> }) {
    return (
        <LanguageContext.Provider value={{ language: SupportedLanguages.english, translations }}>
            <ValHome />
        </LanguageContext.Provider>
    );
}
