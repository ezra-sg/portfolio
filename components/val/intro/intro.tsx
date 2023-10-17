import { useI18n } from "@/hooks/useI18n";

export default function Intro() {
    const { t } = useI18n();

    return (<>
        <div className="w-full bg-white dark:bg-slate-950">
            <p>test test</p>
        </div>
    </>);
}
