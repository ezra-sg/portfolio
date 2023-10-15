"use client"

import { SupportedLanguage, SupportedLanguages } from '@/types/i18n-types';
import { ReactNode, createContext, useContext, useState } from 'react';

interface LanguageContextProps {
    locale: SupportedLanguage;
    switchLanguage: (newLocale: SupportedLanguage) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }: { children: ReactNode}) => {
    const [locale, setLocale] = useState<SupportedLanguage>(SupportedLanguages.english);

    const switchLanguage = (newLocale: SupportedLanguage) => {
        setLocale(newLocale);
    };

    return (
        <LanguageContext.Provider value= {{ locale, switchLanguage }}>
            { children }
        </LanguageContext.Provider>
    );
};
