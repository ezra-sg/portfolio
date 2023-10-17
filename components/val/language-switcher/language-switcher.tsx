"use client"

import { useEffect, useRef, useState } from "react";
import { MdLanguage, MdStar } from "react-icons/md";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { useI18n } from "@/hooks/useI18n";

export default function LanguageSwitcher() {
    const { t } = useI18n();
    const path = usePathname();

    const [isOpen, setIsOpen] = useState(false);

    const buttonRef = useRef<null | HTMLButtonElement>(null);
    const menuRef = useRef<null | HTMLMenuElement>(null);
    const links = useRef([{
        href: '/val/en',
        label: t('nav.english'),
        title: t('nav.english-link-description'),
    }, {
        href: '/val/es',
        label: t('nav.spanish'),
        title: t('nav.spanish-link-description'),
    }]);

    function toggleLanguageMenu() {
        setIsOpen(!isOpen);
    }

    // setup clickaway listener
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const clickedElement = event.target as HTMLElement;
            const userClickedAway = ![menuRef, buttonRef].some(({ current }) => current?.contains(clickedElement));

            if (userClickedAway) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (<>
        <button
            ref={buttonRef}
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
            ref={menuRef}
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
