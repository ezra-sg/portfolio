import { useI18n } from "@/hooks/useI18n";

export default function Intro() {
    const { t } = useI18n();

    return (<>
        <div className="w-full bg-white dark:bg-slate-950 p-4">
            <p className="font-serif dark:text-amber-50 mb-4 first-letter:text-7xl first-letter:float-left first-letter:font-bold first-letter:mr-3">
                Valentine (pronounced <em>val-en-teen</em>), who goes by <em>Val</em>, is my father.
                I wanted to learn more about his life and memorialize some of his achievements.
                So, I asked if he would be willing to sit down with me for an interview.
                This is the result.
            </p>

            <p className="font-serif dark:text-amber-50">Val was born on May 23, 1950 in Corpus Christi, Texas.</p>
        </div>
    </>);
}
