import { RenderResult, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import LanguageSwitcher from '@/components/val/language-switcher/language-switcher';
import { LanguageContext } from '@/hooks/useLanguageContext';
import { SupportedLanguage, SupportedLanguages } from '@/types/i18n-types';
import { act } from 'react-dom/test-utils';

describe('LanguageSwitcher', () => {
    const renderWithLanguage = (language: SupportedLanguage) =>
        render((
            <LanguageContext.Provider value={{ language }}>
                <LanguageSwitcher />
            </LanguageContext.Provider>
        ));

    const getMenuElement = (result: RenderResult) => result.queryByTestId('language-switcher-popup');

    afterEach(() => {
        jest.restoreAllMocks();
    });

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

    it('should hide the menu when the user clicks away', async () => {
        jest.spyOn(document, 'addEventListener');
        jest.spyOn(document, 'removeEventListener');

        const result = renderWithLanguage(SupportedLanguages.english);
        // addEventListener is being called with 'selectionchage' for some reason not related to the code, perhaps
        // a bug in the testing library. it needs to be reset to 0 before the assertions
        (document.addEventListener as jest.Mock).mockReset();

        const button = result.queryByTestId('language-switcher-button');
        expect(button).toBeInTheDocument();

        // event listener should only be added when the menu is open
        expect(document.addEventListener).toHaveBeenCalledTimes(0);

        let menu = getMenuElement(result);
        expect(menu).toHaveAttribute('hidden');

        fireEvent.click(button!);

        expect(menu).not.toHaveAttribute('hidden');
        expect(document.addEventListener).toHaveBeenCalledTimes(1);
        expect(document.addEventListener).toHaveBeenCalledWith('mousedown', expect.any(Function));
        const clickawayHandler = (document.addEventListener as jest.Mock).mock.calls[0][1];

        act(() => {
            // fireEvent/userEvent.click on the document doesn't trigger event handlers
            // so we need to call the handler directly to simulate a click outside the menu
            clickawayHandler({ target: result.queryByTestId('clickme') });
        });

        expect(menu).toHaveAttribute('hidden');
        expect(document.removeEventListener).toHaveBeenCalledTimes(1);
        expect(document.removeEventListener).toHaveBeenCalledWith('mousedown', clickawayHandler);
    });
});
