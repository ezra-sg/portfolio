"use client"

import ValHome from "@/components/val/home/val-home";
import { LanguageContext } from "@/hooks/useLanguageContext";
import { SupportedLanguages } from "@/types/i18n-types";


export default function ValPageEn() {
    return (
        <LanguageContext.Provider value={{ language: SupportedLanguages.spanish }}>
            <ValHome />
        </LanguageContext.Provider>
    );
}
