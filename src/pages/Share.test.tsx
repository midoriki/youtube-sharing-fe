import { render, screen } from '@testing-library/react';
import Share from '@pages/Share';
import { TI_SHARE_PAGE } from '@lib/utils/testId';

describe('Share page', () => {
  it('should render', () => {
    render(<Share />);
    expect(screen.getByTestId(TI_SHARE_PAGE)).toBeInTheDocument();
  });
});