"use client"

import { SupportedLanguage, SupportedLanguages } from '@/types/i18n-types';
import { ReactNode, createContext, useContext, useState } from 'react';

interface LanguageContextProps {
    locale: SupportedLanguage;
}

export const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
