import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@pages/Home';
import { TIPages, TIComponents } from '@lib/test/testId';
import { getAllVideoShares, vote } from '@lib/api';
import { genMockVideoShare } from '@lib/test/factory';
import { notifications } from '@mantine/notifications';
import { useProfileStore } from '@lib/stores/ProfileStore';
import { faker } from '@faker-js/faker';

jest.mock('@lib/api', () => ({
  getAllVideoShares: jest.fn(),
  vote: jest.fn(),
}));
jest.mock('@mantine/notifications', (() => ({
  notifications: {
    show: jest.fn(),
  },
})));
jest.mock('@lib/stores/ProfileStore', () => ({
  useProfileStore: jest.fn(),
}));
class ResizeObserver {
  observe () {}
  unobserve () {}
  disconnect () {}
}
const scrollTo = global.scrollTo;
const resizeObserver = window.ResizeObserver;

const TIHome = TIPages.home;
const TIVideoCard = TIComponents.videoCard;

describe('Home page', () => {
  let mockGetAllVideoShare: jest.Mock;
  let mockVote: jest.Mock;
  let mockNotification: jest.Mock;
  let mockUseProfileStore: jest.Mock;

  beforeAll(() => {
    window.ResizeObserver = ResizeObserver;
    global.scrollTo = jest.fn();
    mockGetAllVideoShare = jest.mocked(getAllVideoShares);
    mockVote = jest.mocked(vote);
    mockNotification = jest.mocked(notifications.show);
    mockUseProfileStore = jest.mocked(useProfileStore);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    global.scrollTo = scrollTo;
    window.ResizeObserver = resizeObserver;
  });

  it('should render empty state', async () => {
    mockGetAllVideoShare.mockResolvedValueOnce({
      data: {
        success: true,
        data: [],
        totalPage: 0,
      },
    });
    mockUseProfileStore.mockReturnValue({ user: null });

    render(<Home />);

    expect(screen.getByTestId(TIHome.default)).toBeInTheDocument();
    expect(screen.queryByTestId(TIHome.perPageSelector)).not.toBeInTheDocument();
    expect(screen.queryByTestId(TIHome.pagination)).not.toBeInTheDocument();

    await act(async () => {
      await screen.findByTestId(TIHome.empty);
    });

    expect(mockGetAllVideoShare).toHaveBeenCalledWith({
      page: 1,
      perPage: 5,
    });
    expect(screen.getByTestId(TIHome.empty)).toBeInTheDocument();
  });

  it('should render with data', async () => {
    const user = userEvent.setup();
    const mockVideoShares = Array(5).fill(1).map(() => genMockVideoShare());
    
    mockUseProfileStore.mockReturnValue({ user: null });

    mockGetAllVideoShare.mockResolvedValue({
      data: {
        success: true,
        data: mockVideoShares,
        totalPage: 2,
      },
    });

    render(<Home />);

    expect(screen.getByTestId(TIHome.default)).toBeInTheDocument();
    expect(screen.queryByTestId(TIHome.perPageSelector)).not.toBeInTheDocument();
    expect(screen.queryByTestId(TIHome.pagination)).not.toBeInTheDocument();

    await screen.findByTestId(TIHome.pagination);
    await screen.findByTestId(TIHome.perPageSelector);

    expect(mockGetAllVideoShare).toHaveBeenCalledWith({
      page: 1,
      perPage: 5,
    });
    expect(screen.getAllByTestId(TIVideoCard.default).length).toBe(mockVideoShares.length);

    await act(() => user.click(screen.getByTestId(TIHome.pagination).lastChild as HTMLButtonElement));
    expect(mockGetAllVideoShare).toBeCalledWith({
      page: 2,
      perPage: 5,
    });

    await act(() => user.click(screen.getByTestId(TIHome.perPageSelector)));
    await act(() => user.click(screen.getAllByText('100')[0]));
    expect(mockGetAllVideoShare).toBeCalledWith({
      page: 1,
      perPage: 100,
    });

    await act(() => user.click(screen.getByTestId(TIHome.refresh)));
    expect(mockGetAllVideoShare).toHaveBeenCalledWith({
      page: 1,
      perPage: 100,
    });
  });

  it('should show notification when vote without logged in', async () => {
    const user = userEvent.setup();
    const mockVideoShares = Array(5).fill(1).map(() => genMockVideoShare());

    mockUseProfileStore.mockReturnValue({ user: null });

    mockGetAllVideoShare.mockResolvedValue({
      data: {
        success: true,
        data: mockVideoShares,
        totalPage: 2,
      },
    });

    render(<Home />);

    expect(screen.getAllByTestId(TIVideoCard.default).length).toBe(mockVideoShares.length);
    await act(() => user.click(screen.getAllByTestId(TIVideoCard.upvoteBtn)[0]));
    expect(mockNotification).toHaveBeenCalledWith({
      message: 'Please login to give your impression',
      color: 'blue',
    });
  });

  it('should allow to vote when logged in', async () => {
    const user = userEvent.setup();
    const mockVideoShares = Array(5).fill(1).map(() => genMockVideoShare());

    mockUseProfileStore.mockReturnValue({ user: {
      id: faker.string.uuid(),
      email: faker.internet.email(),
    } });

    mockGetAllVideoShare.mockResolvedValue({
      data: {
        success: true,
        data: mockVideoShares,
        totalPage: 2,
      },
    });

    mockVote.mockResolvedValueOnce({
      data: {
        success: true,
        message: 'success message',
      },
    });

    render(<Home />);
    
    expect(screen.getAllByTestId(TIVideoCard.default).length).toBe(mockVideoShares.length);
    await act(() => user.click(screen.getAllByTestId(TIVideoCard.upvoteBtn)[0]));
    expect(mockVote).toHaveBeenCalledWith(expect.objectContaining({
      type: 'up',
    }));
    expect(mockNotification).toHaveBeenCalledWith({
      message: 'success message',
      color: 'teal',
    });

    const mockError = new Error('error') as any;
    mockError.response = {
      data: {
        message: 'error message',
      },
    };

    mockVote.mockRejectedValueOnce(mockError);
    await act(() => user.click(screen.getAllByTestId(TIVideoCard.upvoteBtn)[0]));
    expect(mockNotification).toHaveBeenCalledWith({
      message: 'error message',
      color: 'red',
    });
  });
});