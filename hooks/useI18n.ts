import { useContext } from 'react';
import { LanguageContext } from '@/hooks/useLanguageContext';
import { RawTranslations } from '@/types/i18n-types';

type findNestedValueReturnType = string | RawTranslations | undefined;

const findNestedValue = (obj: RawTranslations, keysArray: string[]): findNestedValueReturnType => keysArray.reduce<findNestedValueReturnType>((acc, key) => {
    if (acc && typeof acc === 'object') {
        return (acc as RawTranslations)[key];
    }
    return undefined;
}, obj);

export const useI18n = () => {
    const { language, translations } = useContext(LanguageContext) ?? {};

    if ([language, translations].some(attr => typeof attr === 'undefined')) {
        throw new Error('useI18n must be used within a LanguageProvider');
    }

    const t = (slug: string) => {
        const keysArray = slug.split('.');
        const translation = findNestedValue(translations!, keysArray) ?? slug;

        return translation;
    };

    return { t };
};

