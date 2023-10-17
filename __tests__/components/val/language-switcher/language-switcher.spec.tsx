import { RenderResult, fireEvent, render } from "@testing-library/react";
import '@testing-library/jest-dom';

import LanguageSwitcher from "@/components/val/language-switcher/language-switcher";
import { LanguageContext } from "@/hooks/useLanguageContext";
import { SupportedLanguage, SupportedLanguages } from "@/types/i18n-types";

describe('LanguageSwitcher', () => {
    const renderWithLanguage = (language: SupportedLanguage) =>
        render((
            <LanguageContext.Provider value={{ language }}>
                <LanguageSwitcher />
            </LanguageContext.Provider>
        ));

    const getMenuElement = (result: RenderResult) => result.queryByTestId('language-switcher-popup');

    it('should render correctly', () => {
        const result = renderWithLanguage(SupportedLanguages.english);
        expect(result.container).toMatchSnapshot();
    });

    it('should toggle the menu visibility when the switcher button is clicked', () => {
        const result = renderWithLanguage(SupportedLanguages.english);

        const button = result.queryByTestId('language-switcher-button');
        expect(button).toBeInTheDocument();

        let menu = getMenuElement(result);
        expect(menu).toHaveAttribute('hidden');

        fireEvent.click(button!);

        expect(menu).not.toHaveAttribute('hidden');

        fireEvent.click(button!);

        expect(menu).toHaveAttribute('hidden');
    });

    it('should hide the menu when the user clicks away', () => {
        const result = renderWithLanguage(SupportedLanguages.english);

        const button = result.queryByTestId('language-switcher-button');
        expect(button).toBeInTheDocument();

        let menu = getMenuElement(result);
        expect(menu).toHaveAttribute('hidden');

        fireEvent.click(button!);

        expect(menu).not.toHaveAttribute('hidden');

        fireEvent.mouseDown(document);

        expect(menu).toHaveAttribute('hidden');
    });
});
