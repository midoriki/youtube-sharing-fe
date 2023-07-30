import userEvent from '@testing-library/user-event';
import { act, render, screen } from '@testing-library/react';
import { TILayout, TIComponents } from '@lib/test/testId';
import RegisterLink from '@layout/RegisterLink';

const TIRegisterLink = TILayout.registerLink;
const TIRegister = TIComponents.auth.register;

describe('layout/RegisterLink', () => {
  it('should render with popover', async () => {
    const user = userEvent.setup();

    render(<RegisterLink />);

    expect(screen.getByTestId(TIRegisterLink.default)).toBeInTheDocument();
    expect(screen.queryByTestId(TIRegister.default)).not.toBeInTheDocument();

    await act(() => user.click(screen.getByTestId(TIRegisterLink.default)));
    expect(screen.getByTestId(TIRegister.default)).toBeInTheDocument();
  });
});