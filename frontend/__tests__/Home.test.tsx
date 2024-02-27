import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('', () => {
    it('should have CCA text', () => {
        render(<Home />);
        const myElem = screen.getByTestId('main');
        expect(myElem).toBeInTheDocument();
    });
});
