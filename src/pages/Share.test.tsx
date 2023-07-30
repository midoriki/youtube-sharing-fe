import { render, screen } from '@testing-library/react';
import Share from '@pages/Share';
import { TIPages } from '@lib/test/testId';

describe('Share page', () => {
  it('should render', () => {
    render(<Share />);
    expect(screen.getByTestId(TIPages.share.default)).toBeInTheDocument();
  });
});