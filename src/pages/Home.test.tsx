import { render, screen } from '@testing-library/react';
import Home from '@pages/Home';
import { TI_HOME_PAGE } from '@lib/utils/testId';

describe('Home page', () => {
  it('should render', () => {
    render(<Home />);
    expect(screen.getByTestId(TI_HOME_PAGE)).toBeInTheDocument();
  });
});