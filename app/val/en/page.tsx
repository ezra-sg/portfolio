"use client"

import ValHome from "@/components/val/home/val-home";
import { LanguageContext } from "@/hooks/useLanguage";
import { SupportedLanguages } from "@/types/i18n-types";


export default function ValPageEn() {
    return (
        <LanguageContext.Provider value={{ locale: SupportedLanguages.english }}>
            <ValHome />
        </LanguageContext.Provider>
    );
}
