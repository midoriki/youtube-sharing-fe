import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShareForm from '@components/pages/share/ShareForm';
import { TIComponents } from '@lib/test/testId';
import { faker } from '@faker-js/faker';

const TIShareForm = TIComponents.pages.share.shareForm;

describe('pages/Share/ShareForm', () => {
  it('should render with form submit ability', async () => {
    const user = userEvent.setup();
    const mockHandler = jest.fn();
    const url = 'https://www.youtube.com/watch?v=Wc6twNQvTyw';

    render(<ShareForm onSubmit={mockHandler} />);

    const randomString = faker.string.alpha(10);
    await act(() => user.type(screen.getByTestId(TIShareForm.urlInput), randomString));
    await act(() => user.click(screen.getByTestId(TIShareForm.submitBtn)));

    const errorText = 'Please enter a valid Youtube video URL!';
    expect(screen.getByText(errorText)).toBeInTheDocument();

    await act(() => user.clear(screen.getByTestId(TIShareForm.urlInput)));
    expect(screen.queryByText(errorText)).not.toBeInTheDocument();

    await act(() => user.type(screen.getByTestId(TIShareForm.urlInput), url));
    await act(() => user.click(screen.getByTestId(TIShareForm.submitBtn)));
    expect(mockHandler).toHaveBeenCalledWith(url);
    expect((screen.getByTestId(TIShareForm.urlInput) as HTMLInputElement).value).toBe('');
  });
});