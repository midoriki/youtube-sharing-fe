import userEvent from '@testing-library/user-event';
import LoginLink from '@layout/LoginLink';
import { act, render, screen } from '@testing-library/react';
import { TILayout, TIComponents } from '@lib/test/testId';

const TILoginLink = TILayout.loginLink;
const TILogin = TIComponents.auth.login;

describe('layout/LoginLink', () => {
  it('should render with popover', async () => {
    const user = userEvent.setup();

    render(<LoginLink />);

    expect(screen.getByTestId(TILoginLink.default)).toBeInTheDocument();
    expect(screen.queryByTestId(TILogin.default)).not.toBeInTheDocument();

    await act(() => user.click(screen.getByTestId(TILoginLink.default)));
    expect(screen.getByTestId(TILogin.default)).toBeInTheDocument();
  });
});