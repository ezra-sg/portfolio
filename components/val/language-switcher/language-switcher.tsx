"use client"

import { useState } from "react";
import { MdLanguage } from "react-icons/md";

import { SupportedLanguage, SupportedLanguages } from "@/types/i18n-types";
import Link from "next/link";

export default function LanguageSwitcher() {
    const [isOpen, setIsOpen] = useState(false);

    // eztodo add clickaway

    function toggleLanguageMenu() {
        setIsOpen(!isOpen);
    }

    // eztodo i18n labels
    return (<>
        <button
            id="language-switcher-button"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-controls="language-switcher-popup"
            aria-label="Switch language"
            onClick={toggleLanguageMenu}
        >
            <MdLanguage />
        </button>

        <menu
            id="language-switcher-popup"
            role="region"
            aria-label="Language switcher popup"
            hidden={!isOpen}
            aria-hidden={!isOpen}
            className="absolute top-8 right-8 shadow-lg p-3 bg-amber-100"
        >
            <li>
                <Link
                    href="/val/en"
                    title="Switch the language to English"
                >
                    English
                </Link>
            </li>
            <li>
                <Link
                    href="/val/es"
                    title="Cambiar el idioma a español"
                >
                    Español
                </Link>
            </li>
        </menu>
    </>);
}
