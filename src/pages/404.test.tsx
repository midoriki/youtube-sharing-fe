import { render, screen } from '@testing-library/react';
import NotFound from './404';

describe('404', () => {
  it('should render', () => {
    render(<NotFound />);
    expect(screen.getByText('404 | Sorry this page does not exist.')).toBeInTheDocument();
  });
});