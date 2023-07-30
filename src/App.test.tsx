import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should render', () => {
    render(<App />);
    expect(screen.getByTestId('app-root')).toBeInTheDocument();
  });
});
