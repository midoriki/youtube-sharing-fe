import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { TI_APP_ROOT } from '@lib/utils/testId';

describe('App', () => {
  it('should render', () => {
    render(<App />);
    expect(screen.getByTestId(TI_APP_ROOT)).toBeInTheDocument();
  });
});
