import { Young_Serif, Poppins } from 'next/font/google';

import LanguageSwitcher from '@/components/val/language-switcher/language-switcher';

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
    return (<>
        <div className={`bg-amber-50 dark:bg-amber-950 h-screen w-screen ${youngSerif.variable} ${poppins.variable}`}>
            <header className="flex justify-end p-4">
                <LanguageSwitcher />
            </header>
            <article>
                <h1 className="font-header text-5xl text-amber-900 dark:text-amber-50">
                    Goose
                </h1>
                <h2 className="font-sans">The Story of Valentine Guzman</h2>
            </article>
        </div>
    </>)
}
