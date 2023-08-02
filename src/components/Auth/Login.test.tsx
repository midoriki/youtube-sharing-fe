import userEvent from '@testing-library/user-event';
import { act, render, screen } from '@testing-library/react';
import Login from '@components/Auth/Login';
import { TIComponents } from '@lib/test/testId';
import { faker } from '@faker-js/faker';

const TIInput = TIComponents.auth.login;

describe('Login', () => {
  it('should render with form', async () => {
    const user = userEvent.setup();
    const mockHandler = jest.fn();

    render(<Login onSubmit={mockHandler} />);

    expect(screen.getByTestId(TIInput.default)).toBeInTheDocument();

    await act(() => user.click(screen.getByTestId(TIInput.submitBtn)));

    expect(screen.getByText('Email can not be empty')).toBeInTheDocument();
    expect(screen.getByText('Password can not be empty')).toBeInTheDocument();

    await act(() => user.type(screen.getByTestId(TIInput.emailInput), faker.string.alpha(5)));
    await act(() => user.type(screen.getByTestId(TIInput.passwordInput), faker.string.alpha(3)));
    await act(() => user.click(screen.getByTestId(TIInput.submitBtn)));
    expect(screen.getByText('Email is invalid')).toBeInTheDocument();
    expect(screen.getByText('Password is too short')).toBeInTheDocument();

    await act(() => user.clear(screen.getByTestId(TIInput.emailInput)));
    await act(() => user.clear(screen.getByTestId(TIInput.passwordInput)));


    const mockEmail = faker.internet.email();
    const mockPassword = faker.string.alphanumeric(7);
    await act(() => user.type(screen.getByTestId(TIInput.emailInput), mockEmail));
    await act(() => user.type(screen.getByTestId(TIInput.passwordInput), mockPassword));
    await act(() => user.click(screen.getByTestId(TIInput.submitBtn)));

    expect(mockHandler).toHaveBeenCalledWith({ email: mockEmail, password: mockPassword });
  });
});