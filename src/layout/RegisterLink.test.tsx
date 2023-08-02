import userEvent from '@testing-library/user-event';
import { act, render, screen } from '@testing-library/react';
import { TILayout, TIComponents } from '@lib/test/testId';
import RegisterLink from '@layout/RegisterLink';
import { notifications } from '@mantine/notifications';
import { register } from '@lib/api';
import useCheckProfile from '@lib/hooks/useCheckProfile';
import { faker } from '@faker-js/faker';

jest.mock('@mantine/notifications', (() => ({
  notifications: {
    show: jest.fn(),
  },
})));
jest.mock('@lib/api', (() => ({
  register: jest.fn(),
})));
jest.mock('@lib/hooks/useCheckProfile');

const TIRegisterLink = TILayout.registerLink;
const TIRegister = TIComponents.auth.register;

describe('layout/RegisterLink', () => {
  it('should render with popover', async () => {
    const user = userEvent.setup();
    const mockRegister = jest.mocked(register);
    const mockUseCheckProfile = jest.mocked(useCheckProfile);
    const mockFn = jest.fn();
    mockUseCheckProfile.mockReturnValue(mockFn);
    const mockNotification = jest.mocked(notifications.show);

    render(<RegisterLink />);

    expect(screen.getByTestId(TIRegisterLink.default)).toBeInTheDocument();
    expect(screen.queryByTestId(TIRegister.default)).not.toBeInTheDocument();

    await act(() => user.click(screen.getByTestId(TIRegisterLink.default)));
    expect(screen.getByTestId(TIRegister.default)).toBeInTheDocument();

    const fakeEmail = faker.internet.email();
    const fakePassword = faker.string.alphanumeric(6);

    await act(() => user.type(screen.getByTestId(TIRegister.emailInput), fakeEmail));
    await act(() => user.type(screen.getByTestId(TIRegister.passwordInput), fakePassword));
    await act(() => user.type(screen.getByTestId(TIRegister.passwordConfirmationInput), fakePassword));
    await act(() => user.click(screen.getByTestId(TIRegister.submitBnt)));

    expect(mockRegister).toHaveBeenCalledWith({
      email: fakeEmail,
      password: fakePassword,
      passwordConfirmation: fakePassword,
    });
    expect(mockFn).toHaveBeenCalledTimes(1);

    const mockError = new Error('error') as any;
    mockError.response = {
      data: {
        message: 'message',
      },
    };
    mockRegister.mockRejectedValueOnce(mockError);
    await act(() => user.click(screen.getByTestId(TIRegister.submitBnt)));
    expect(mockNotification).toHaveBeenCalledWith({
      message: 'message',
      color: 'red',
    });
  });
});