import { Young_Serif, Poppins } from 'next/font/google';

import LanguageSwitcher from '@/components/val/language-switcher/language-switcher';
import Intro from '@/components/val/intro/intro';

const youngSerif = Young_Serif({
    weight: '400',
    subsets: ['latin-ext'],
    variable: '--font-young-serif',
})

const poppins = Poppins({
    weight: '400',
    subsets: ['latin-ext'],
    variable: '--font-poppins',
});

export default function ValHome() {

    return (
        <div className={`bg-amber-50 dark:bg-slate-950 w-[100svw] min-h-[100svh] ${youngSerif.variable} ${poppins.variable}`}>
            <header className="absolute top-4 right-4 z-50">
                <LanguageSwitcher />
            </header>
            <article>
                <Intro />
            </article>
        </div>
    )
}
