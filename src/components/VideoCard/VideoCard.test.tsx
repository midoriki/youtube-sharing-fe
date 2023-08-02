import { genMockVideoShare } from '@lib/test/factory';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VideoCard from '@components/VideoCard/VideoCard';
import {
  TIComponents,
} from '@lib/test/testId';
import { Vote } from '@interfaces/VideoShare';

const TIVideoCard = TIComponents.videoCard;

describe('VideoCard', () => {
  it('should render with provided information', async () => {
    const user = userEvent.setup();
    const mockVideoShare = genMockVideoShare();
    const mockHandler = jest.fn();
    render(<VideoCard videoShare={mockVideoShare} onVote={mockHandler} />);
    expect(screen.getByTestId(TIVideoCard.default)).toBeInTheDocument();
    expect(screen.getByTestId(TIVideoCard.title).textContent).toBe(mockVideoShare.title);
    expect(screen.getByTestId(TIVideoCard.author).textContent).toBe(mockVideoShare.author);
    expect(screen.getByTestId(TIVideoCard.upvote).textContent).toBe(mockVideoShare.upvote.toString());
    expect(screen.getByTestId(TIVideoCard.downvote).textContent).toBe(mockVideoShare.downvote.toString());
    expect(screen.getByTestId(TIVideoCard.description).textContent).toContain(
      mockVideoShare.description,
    );

    await user.click(screen.getByTestId(TIVideoCard.upvoteBtn));
    expect(mockHandler).toHaveBeenCalledWith(mockVideoShare.id, Vote.UP);

    await user.click(screen.getByTestId(TIVideoCard.downvoteBtn));
    expect(mockHandler).toHaveBeenCalledWith(mockVideoShare.id, Vote.DOWN);
  });
});