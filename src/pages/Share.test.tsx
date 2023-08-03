import { render, screen } from '@testing-library/react';
import Share from '@pages/Share';
import { TIPages, TIComponents } from '@lib/test/testId';
import userEvent from '@testing-library/user-event';
import { shareVideo } from '@lib/api';
import { notifications } from '@mantine/notifications';
import { act } from 'react-dom/test-utils';
import { AxiosResponse } from 'axios';

jest.mock('@mantine/notifications', (() => ({
  notifications: {
    show: jest.fn(),
  },
})));
jest.mock('@lib/api', (() => ({
  shareVideo: jest.fn(),
})));

const TIShareForm = TIComponents.pages.share.shareForm;

describe('Share page', () => {
  it('should render', async () => {
    const user = userEvent.setup();
    const mockShareVideo = jest.mocked(shareVideo);
    const mockNotification = jest.mocked(notifications.show);
    
    render(<Share />);
    
    expect(screen.getByTestId(TIPages.share.default)).toBeInTheDocument();

    mockShareVideo.mockResolvedValueOnce({
      data: {
        success: true,
        message: 'success message',
      },
    } as AxiosResponse);

    const url = 'https://www.youtube.com/watch?v=Wc6twNQvTyw';
    await act(() => user.type(screen.getByTestId(TIShareForm.urlInput), url));
    await act(() => user.click(screen.getByTestId(TIShareForm.submitBtn)));

    expect(mockShareVideo).toHaveBeenCalledWith(url);
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
    mockShareVideo.mockRejectedValueOnce(mockError);
    await act(() => user.type(screen.getByTestId(TIShareForm.urlInput), url));
    await act(() => user.click(screen.getByTestId(TIShareForm.submitBtn)));
    expect(mockNotification).toHaveBeenCalledWith({
      message: 'error message',
      color: 'red',
    });
  });
});