import { render, screen } from '@testing-library/react';
import Home from '@pages/Home';
import { TIPages } from '@lib/test/testId';

describe('Home page', () => {
  it('should render', () => {
    render(<Home />);
    expect(screen.getByTestId(TIPages.home.default)).toBeInTheDocument();
  });
});