import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { TIRoot } from '@lib/test/testId';
import { BrowserRouter } from 'react-router-dom';

describe('App', () => {
  it('should render', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(screen.getByTestId(TIRoot.default)).toBeInTheDocument();
  });
});
