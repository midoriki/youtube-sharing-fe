import userEvent from '@testing-library/user-event';
import LoginLink from '@layout/LoginLink';
import { act, render, screen } from '@testing-library/react';
import { TILayout, TIComponents } from '@lib/test/testId';
import { login } from '@lib/api';
import useCheckProfile from '@lib/hooks/useCheckProfile';
import { faker } from '@faker-js/faker';
import { notifications } from '@mantine/notifications';

jest.mock('@mantine/notifications', (() => ({
  notifications: {
    show: jest.fn(),
  },
})));
jest.mock('@lib/api', (() => ({
  login: jest.fn(),
})));
jest.mock('@lib/hooks/useCheckProfile');

const TILoginLink = TILayout.loginLink;
const TILogin = TIComponents.auth.login;

describe('layout/LoginLink', () => {
  it('should render with popover', async () => {
    const user = userEvent.setup();
    const mockLogin = jest.mocked(login);
    const mockUseCheckProfile = jest.mocked(useCheckProfile);
    const mockFn = jest.fn();
    mockUseCheckProfile.mockReturnValue(mockFn);
    const mockNotification = jest.mocked(notifications.show);

    render(<LoginLink />);

    expect(screen.getByTestId(TILoginLink.default)).toBeInTheDocument();
    expect(screen.queryByTestId(TILogin.default)).not.toBeInTheDocument();

    await act(() => user.click(screen.getByTestId(TILoginLink.default)));
    expect(screen.getByTestId(TILogin.default)).toBeInTheDocument();

    const fakeEmail = faker.internet.email();
    const fakePassword = faker.string.alphanumeric(6);

    await act(() => user.type(screen.getByTestId(TILogin.emailInput), fakeEmail));
    await act(() => user.type(screen.getByTestId(TILogin.passwordInput), fakePassword));
    await act(() => user.click(screen.getByTestId(TILogin.submitBnt)));

    expect(mockLogin).toHaveBeenCalledWith({
      email: fakeEmail,
      password: fakePassword,
    });
    expect(mockFn).toHaveBeenCalledTimes(1);

    const mockError = new Error('error') as any;
    mockError.response = {
      data: {
        message: 'message',
      },
    };
    mockLogin.mockRejectedValueOnce(mockError);
    await act(() => user.click(screen.getByTestId(TILogin.submitBnt)));
    expect(mockNotification).toHaveBeenCalledWith({
      message: 'message',
      color: 'red',
    });
  });
});