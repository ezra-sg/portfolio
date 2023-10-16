"use client"

import { useRef, useState } from "react";
import { MdLanguage, MdStar } from "react-icons/md";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { useI18n } from "@/hooks/useI18n";

export default function LanguageSwitcher() {
    const [isOpen, setIsOpen] = useState(false);

    const { t } = useI18n();
    const path = usePathname();

    const links = useRef([{
        href: '/val/en',
        label: t('nav.english'),
        title: t('nav.english-link-description'),
    }, {
        href: '/val/es',
        label: t('nav.spanish'),
        title: t('nav.spanish-link-description'),
    }]);

    // eztodo add clickaway

    function toggleLanguageMenu() {
        setIsOpen(!isOpen);
    }

    return (<>
        <button
            id="language-switcher-button"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-controls="language-switcher-popup"
            aria-label={t('nav.language-button-label')}
            onClick={toggleLanguageMenu}
        >
            <MdLanguage className="dark:text-amber-50" />
        </button>

        <menu
            id="language-switcher-popup"
            role="region"
            aria-label={t('nav.popup-label')}
            hidden={!isOpen}
            aria-hidden={!isOpen}
            className="absolute top-8 right-8 shadow-lg p-3 bg-amber-100"
        >
            {links.current.map(({ href, label, title }) => (
                <li key={title} className="flex items-center gap-2">
                    <MdStar className={href === path ? 'text-black' : 'text-transparent'} />

                    <Link href={href} title={title}>
                        {label}
                    </Link>
                </li>
            ))}
        </menu>
    </>);
}
