import { Young_Serif, Nunito_Sans } from 'next/font/google';

import LanguageSwitcher from '@/components/val/language-switcher/language-switcher';
import Hero from '@/components/val/hero/hero';
import Intro from '@/components/val/intro/intro';

const youngSerif = Young_Serif({
    weight: '400',
    subsets: ['latin-ext'],
    variable: '--font-young-serif',
});

const poppins = Nunito_Sans({
    weight: '400',
    subsets: ['latin-ext'],
    variable: '--font-nunito',
});

export default function ValHome() {
    return (
        <div className={`bg-amber-50 dark:bg-stone-950 w-[100svw] min-h-[100svh] max-w-full ${youngSerif.variable} ${poppins.variable}`}>
            <header className="fixed top-4 right-4 z-50">
                <LanguageSwitcher />
            </header>

            <article>
                <Hero />
                <Intro />
            </article>
        </div>
    );
}
