export type SupportedLanguage = 'en' | 'es';
export const SupportedLanguages: Record<'english' | 'spanish', SupportedLanguage> = {
    english: 'en',
    spanish: 'es',
};

export type RawTranslations = {
    [key: string]: string | RawTranslations;
};
