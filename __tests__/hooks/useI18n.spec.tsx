import { renderHook } from "@testing-library/react";

import { useI18n } from "@/hooks/useI18n";
import { LanguageContext } from "@/hooks/useLanguageContext";
import { SupportedLanguage, SupportedLanguages } from "@/types/i18n-types";

jest.mock('@/i18n/en.json', () => ({ test: 'eng' }), { virtual: true });
jest.mock('@/i18n/es.json', () => ({ test: 'span' }), { virtual: true });

describe('useI18n', () => {
    it('should throw an error when used outside of a LanguageContext provider', () => {
        // Temporarily mock console.error to prevent log spam
        const originalError = console.error;
        console.error = jest.fn();

        expect(() => renderHook(() => useI18n())).toThrow();

        // Restore original console.error
        console.error = originalError;
    });

    it('should return a function which returns a translation or the slug if not found', () => {
        const renderWithLanguage = (language: SupportedLanguage) => {
            return renderHook(() => useI18n(), {
                wrapper: ({ children }) => (
                    <LanguageContext.Provider value={{ language }}>
                        {children}
                    </LanguageContext.Provider>
                ),
            });
        }

        const englishResult = renderWithLanguage(SupportedLanguages.english);
        const spanishResult = renderWithLanguage(SupportedLanguages.spanish);

        expect(englishResult.result.current.t('test')).toBe('eng');
        expect(englishResult.result.current.t('not-there')).toBe('not-there');

        expect(spanishResult.result.current.t('test')).toBe('span');
        expect(spanishResult.result.current.t('not-there-2')).toBe('not-there-2');
    });
});
