import { useContext } from 'react';
import { LanguageContext } from '@/hooks/useLanguageContext';


export const useI18n = () => {
    const { language, translations } = useContext(LanguageContext) ?? {};

    if ([language, translations].some(attr => typeof attr === 'undefined')) {
        throw new Error('useI18n must be used within a LanguageProvider');
    }

    const t = (slug: string) => translations?.[slug] ?? slug;

    return { t };
};
