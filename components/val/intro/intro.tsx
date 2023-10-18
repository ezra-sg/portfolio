import { useI18n } from '@/hooks/useI18n';

export default function Intro() {
    const { t } = useI18n();

    return (<>
        <div className="w-full bg-white dark:bg-slate-950 p-4 pt-12">
            <p className="font-serif dark:text-amber-50 mb-4 first-letter:text-amber-900 first-letter:text-7xl first-letter:float-left first-letter:font-bold first-letter:mr-3 dark:first-letter:text-amber-200">
                Valentín goes by <em>Val</em>, <em>Goose</em>, <em>Dad</em>, or <em>Doodles</em>, depending on who you ask.
                The latter two are just for us kids to use. He really doesn&apos;t like being called <em>Doodles</em>.
                He was born on May 23, 1950 in Corpus Christi, Texas.
            </p>

            <p className="font-serif dark:text-amber-50"></p>
        </div>
    </>);
}
