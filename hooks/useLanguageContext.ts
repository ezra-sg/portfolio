'use client';

import { RawTranslations, SupportedLanguage } from '@/types/i18n-types';
import { createContext, useContext } from 'react';

interface LanguageContextProps {
    language: SupportedLanguage;
    translations: RawTranslations;
}

export const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const useLanguageContext = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
