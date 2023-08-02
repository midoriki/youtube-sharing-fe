import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@pages/Home';
import { TIPages, TIComponents } from '@lib/test/testId';
import { getAllVideoShares } from '@lib/api';
import { genMockVideoShare } from '@lib/test/factory';

jest.mock('@lib/api', () => ({
  getAllVideoShares: jest.fn(),
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

  beforeAll(() => {
    window.ResizeObserver = ResizeObserver;
    global.scrollTo = jest.fn();
    mockGetAllVideoShare = jest.mocked(getAllVideoShares);
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
    await act(() => user.click(screen.getByText('100')));
    expect(mockGetAllVideoShare).toBeCalledWith({
      page: 1,
      perPage: 100,
    });
  });
});