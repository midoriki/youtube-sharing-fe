import { render, screen } from '@testing-library/react';
import App from './App';
import { TIRoot } from '@lib/test/testId';
import { BrowserRouter } from 'react-router-dom';
import useCheckProfile from '@lib/hooks/useCheckProfile';

jest.mock('@pages/Home');
jest.mock('@lib/api');
jest.mock('@lib/hooks/useCheckProfile');
jest.mock('socket.io-client');

describe('App', () => {
  it('should render', () => {
    const mockUseCheckProfile = jest.mocked(useCheckProfile);
    const mockFn = jest.fn();
    mockUseCheckProfile.mockReturnValue(mockFn);
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(screen.getByTestId(TIRoot.default)).toBeInTheDocument();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
