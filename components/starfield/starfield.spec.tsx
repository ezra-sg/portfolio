import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Starfield from './starfield';

describe('<Starfield />', () => {
    it('test123', () => {
        render(<Starfield />);

        const canvas = screen.getByTestId('starfield-canvas');

        expect(canvas).toBeInTheDocument();
    })
})
