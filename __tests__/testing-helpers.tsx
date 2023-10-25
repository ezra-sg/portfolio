import { LanguageContext } from '@/hooks/useLanguageContext';
import { SupportedLanguage, SupportedLanguages } from '@/types/i18n-types';
import { render } from '@testing-library/react';
import { ReactNode } from 'react';

// render children inside of a LanguageContext.Provider
export function renderWithLanguage(
    children: ReactNode,
    language: SupportedLanguage = SupportedLanguages.english,
) {
    return render((
        <LanguageContext.Provider value={{ language, translations: {} }}>
            {children}
        </LanguageContext.Provider>
    ));
}
