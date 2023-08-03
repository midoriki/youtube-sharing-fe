import { useMediaQuery } from '@mantine/hooks';
import { useProfileStore } from '@lib/stores/ProfileStore';
import Header from './Header';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TILayout } from '@lib/test/testId';
import MantineTestProvider from '@lib/test/TestProvider';
import { faker } from '@faker-js/faker';

jest.mock('@lib/stores/ProfileStore');
jest.mock('@mantine/hooks', () => ({
  ...jest.requireActual('@mantine/hooks'),
  useMediaQuery: jest.fn().mockReturnValue(false),
}));

const TIHeader = TILayout.header;
const TIAvatar = TILayout.avatar;
const TILoginLink = TILayout.loginLink;
const TIRegisterLink = TILayout.registerLink;

describe('Header', () => {
  it('should render when not login and in desktop mode', async () => {
    const mockUseProfileStore = jest.mocked(useProfileStore);
    const mockUseMediaQuery = jest.mocked(useMediaQuery);

    mockUseMediaQuery.mockReturnValue(false);
    mockUseProfileStore.mockReturnValue({
      user: null,
      setUser: jest.fn(),
    });

    render(
      <MantineTestProvider>
        <Header />
      </MantineTestProvider>,
    );

    expect(screen.getByTestId(TIHeader.default)).toBeInTheDocument();

    expect(screen.getByTestId(TIHeader.title)).toBeInTheDocument();
    expect(screen.getByTestId(TILoginLink.default)).toBeInTheDocument();
    expect(screen.getByTestId(TIRegisterLink.default)).toBeInTheDocument();
    expect(screen.queryByTestId(TIHeader.homeIcon)).not.toBeInTheDocument();
    expect(screen.queryByTestId(TIAvatar.default)).not.toBeInTheDocument();
    expect(screen.queryByTestId(TIHeader.share)).not.toBeInTheDocument();
  });

  it('should render when not login and in mobile mode', async () => {
    const mockUseProfileStore = jest.mocked(useProfileStore);
    const mockUseMediaQuery = jest.mocked(useMediaQuery);

    mockUseMediaQuery.mockReturnValue(true);
    mockUseProfileStore.mockReturnValue({
      user: null,
      setUser: jest.fn(),
    });

    render(
      <MantineTestProvider>
        <Header />
      </MantineTestProvider>,
    );

    expect(screen.getByTestId(TIHeader.default)).toBeInTheDocument();

    expect(screen.getByTestId(TIHeader.homeIcon)).toBeInTheDocument();
    expect(screen.getByTestId(TILoginLink.default)).toBeInTheDocument();
    expect(screen.getByTestId(TIRegisterLink.default)).toBeInTheDocument();
    expect(screen.queryByTestId(TIHeader.title)).not.toBeInTheDocument();
    expect(screen.queryByTestId(TIAvatar.default)).not.toBeInTheDocument();
    expect(screen.queryByTestId(TIHeader.share)).not.toBeInTheDocument();
  });

  it('should render when logged and in desktop mode', async () => {
    const user = userEvent.setup();
    const mockUseProfileStore = jest.mocked(useProfileStore);
    const mockUseMediaQuery = jest.mocked(useMediaQuery);

    const mockUser = {
      id: faker.string.uuid(),
      email: faker.internet.email(),
    };

    mockUseMediaQuery.mockReturnValue(false);
    mockUseProfileStore.mockReturnValue({
      user: mockUser,
      setUser: jest.fn(),
    });

    render(
      <MantineTestProvider>
        <Header />
      </MantineTestProvider>,
    );

    expect(screen.getByTestId(TIHeader.default)).toBeInTheDocument();

    expect(screen.getByTestId(TIHeader.title)).toBeInTheDocument();
    expect(screen.getByTestId(TIAvatar.default)).toBeInTheDocument();
    expect(screen.getByTestId(TIHeader.share)).toBeInTheDocument();
    expect(screen.queryByTestId(TIHeader.homeIcon)).not.toBeInTheDocument();
    expect(screen.queryByTestId(TILoginLink.default)).not.toBeInTheDocument();
    expect(screen.queryByTestId(TIRegisterLink.default)).not.toBeInTheDocument();

    await act(() => user.click(screen.getByTestId(TIAvatar.default)));
    expect(screen.getByTestId(TIAvatar.email).textContent).toBe(mockUser.email);
  });


  it('should render when logged and in mobile mode', async () => {
    const user = userEvent.setup();
    const mockUseProfileStore = jest.mocked(useProfileStore);
    const mockUseMediaQuery = jest.mocked(useMediaQuery);

    const mockUser = {
      id: faker.string.uuid(),
      email: faker.internet.email(),
    };

    mockUseMediaQuery.mockReturnValue(true);
    mockUseProfileStore.mockReturnValue({
      user: mockUser,
      setUser: jest.fn(),
    });

    render(
      <MantineTestProvider>
        <Header />
      </MantineTestProvider>,
    );

    expect(screen.getByTestId(TIHeader.default)).toBeInTheDocument();

    expect(screen.getByTestId(TIHeader.homeIcon)).toBeInTheDocument();
    expect(screen.getByTestId(TIAvatar.default)).toBeInTheDocument();
    expect(screen.getByTestId(TIHeader.share)).toBeInTheDocument();
    expect(screen.queryByTestId(TIHeader.title)).not.toBeInTheDocument();
    expect(screen.queryByTestId(TILoginLink.default)).not.toBeInTheDocument();
    expect(screen.queryByTestId(TIRegisterLink.default)).not.toBeInTheDocument();

    await act(() => user.click(screen.getByTestId(TIAvatar.default)));
    expect(screen.getByTestId(TIAvatar.email).textContent).toBe(mockUser.email);
  });
});