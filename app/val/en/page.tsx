import { SupportedLanguages } from "@/types/i18n-types";
import ValHome from "@/components/val/home/val-home";
import { LanguageProvider } from "@/hooks/useLanguage";

export default function ValPageEn() {
    return (
        <LanguageProvider>
            <ValHome />
        </LanguageProvider>
    );
}
