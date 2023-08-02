import { faker } from '@faker-js/faker';
import { Api } from '@lib/api';
import { useProfileStore } from '@lib/stores/ProfileStore';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Avatar from './Avatar';
import { TILayout } from '@lib/test/testId';

jest.mock('@lib/stores/ProfileStore', () => ({
  useProfileStore: jest.fn(),
}));
jest.mock('@lib/api', () => ({
  Api: {
    token: 'token',
  },
}));

const TIAvatar = TILayout.avatar;

describe('Avatar', () => {
  it('should rendered and works properly', async () => {
    const userTest = userEvent.setup();
    const fakerUser = { id: faker.string.uuid(), email: faker.internet.email() };
    const mockUseProfileStore = jest.mocked(useProfileStore);
    const mockSetUser = jest.fn();
    mockUseProfileStore.mockReturnValue({
      user: fakerUser,
      setUser: mockSetUser,
    });

    render(<Avatar />);
    expect(screen.getByTestId(TIAvatar.default)).toBeInTheDocument();
    expect(screen.queryByTestId(TIAvatar.email)).not.toBeInTheDocument();
    expect(screen.queryByTestId(TIAvatar.logout)).not.toBeInTheDocument();

    await act(() => userTest.click(screen.getByTestId(TIAvatar.default)));
    expect(screen.getByTestId(TIAvatar.email)).toBeInTheDocument();
    expect(screen.getByTestId(TIAvatar.logout)).toBeInTheDocument();
    expect(screen.getByTestId(TIAvatar.email).textContent).toBe(fakerUser.email);

    await act(() => userTest.click(screen.getByTestId(TIAvatar.logout)));
    expect(mockSetUser).toHaveBeenCalledWith(null);
    expect(Api.token).toBeNull();
  });
});