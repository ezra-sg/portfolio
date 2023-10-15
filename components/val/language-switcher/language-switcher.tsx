"use client"

import { useState } from "react";
import { MdLanguage } from "react-icons/md";

import { SupportedLanguage, SupportedLanguages } from "@/types/i18n-types";
import { useLanguage } from "@/hooks/useLanguage";

export default function LanguageSwitcher() {
    const [isOpen, setIsOpen] = useState(false);

    // eztodo add clickaway

    const { locale, switchLanguage } = useLanguage();

    function toggleLanguageMenu() {
        setIsOpen(!isOpen);
    }

    // eztodo i18n
    return (<>
        <button
            id="language-switcher-button"
            aria-haspopup="menu"
            aria-expanded={isOpen}
            aria-controls="language-switcher-popup"
            aria-label="Switch language"
            onClick={toggleLanguageMenu}
        >
            <MdLanguage />
        </button>

        <div
            id="language-switcher-popup"
            role="region"
            aria-label="Language switcher popup"
            hidden={!isOpen}
            aria-hidden={!isOpen}
            className="absolute top-8 right-8 shadow-lg p-3 bg-amber-100"
        >
            {/* eztodo i18n for the label, aria lables */}
            <label htmlFor="language-select">
                Available languages
                <br/>

                <select
                    id="language-select"
                    defaultValue={locale}
                    onChange={(e) => switchLanguage(e.target.value as SupportedLanguage)}
                >
                    <option value={SupportedLanguages.english}>
                        English
                    </option>
                    <option value={SupportedLanguages.spanish}>
                        Español
                    </option>
                </select>
            </label>
        </div>
    </>);
}
