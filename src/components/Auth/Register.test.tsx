import userEvent from '@testing-library/user-event';
import { act, render, screen } from '@testing-library/react';
import Register from '@components/Auth/Register';
import { TIComponents } from '@lib/test/testId';
import { faker } from '@faker-js/faker';

const TIRegister = TIComponents.auth.register;

describe('Register', () => {
  it('should render with form', async () => {
    const user = userEvent.setup();
    const mockHandler = jest.fn();

    render(<Register onSubmit={mockHandler} />);

    expect(screen.getByTestId(TIRegister.default)).toBeInTheDocument();

    await act(() => user.click(screen.getByTestId(TIRegister.submitBnt)));

    expect(screen.getByText('Email can not be empty')).toBeInTheDocument();
    expect(screen.getByText('Password can not be empty')).toBeInTheDocument();

    await act(() => user.type(screen.getByTestId(TIRegister.emailInput), faker.string.alpha(5)));
    await act(() => user.type(screen.getByTestId(TIRegister.passwordInput), faker.string.alpha(3)));
    await act(() => user.click(screen.getByTestId(TIRegister.submitBnt)));
    expect(screen.getByText('Email is invalid')).toBeInTheDocument();
    expect(screen.getByText('Password is too short')).toBeInTheDocument();
    expect(screen.getByText('Repeat password does not match')).toBeInTheDocument();

    await act(() => user.clear(screen.getByTestId(TIRegister.emailInput)));
    await act(() => user.clear(screen.getByTestId(TIRegister.passwordInput)));

    const mockEmail = faker.internet.email();
    const mockPassword = faker.string.alphanumeric(7);
    await act(() => user.type(screen.getByTestId(TIRegister.emailInput), mockEmail));
    await act(() => user.type(screen.getByTestId(TIRegister.passwordInput), mockPassword));
    await act(() => user.type(screen.getByTestId(TIRegister.passwordConfirmationInput), mockPassword));
    await act(() => user.click(screen.getByTestId(TIRegister.submitBnt)));

    expect(mockHandler).toHaveBeenCalledWith({
      email: mockEmail,
      password: mockPassword,
      passwordConfirmation: mockPassword,
    });
  });
});