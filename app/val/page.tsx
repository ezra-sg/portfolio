import './val.scss';
import { Young_Serif, Poppins } from 'next/font/google'

/*
 * Colors?:
 * - amber-50
 * - amber-500
 * - amber-900
 * - lime-900
 * - emerald-100
 */

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

export default function ValPage() {
    return (<>
        <div className={`bg-amber-50 h-screen w-screen ${youngSerif.variable} ${poppins.variable}`}>
            <article>
                <h1 className="font-header">Test</h1>
                <p className="font-serif">Serif text</p>
                <p className="font-sans">Sans text</p>
            </article>
        </div>
    </>)
}
