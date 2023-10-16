import { useContext } from 'react';
import en from '@/i18n/en.json';
import es from '@/i18n/es.json';
import { LanguageContext } from '@/hooks/useLanguageContext';

const translations = {
    en,
    es,
} as Record<'en' | 'es', Record<string, string>>;

export const useI18n = () => {
    const { language } = useContext(LanguageContext) ?? {};

    if (typeof language === 'undefined') {
        throw new Error('useI18n must be used within a LanguageProvider');
    }

    const t = (key: string) => {
        return translations[language]?.[key] ?? key;
    };

    return { t };
};
