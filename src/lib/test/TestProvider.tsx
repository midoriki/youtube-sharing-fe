import { MantineProvider } from '@mantine/core';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

export default function TestProvider ({ children }: {children: React.ReactNode}) {
  return (
    <BrowserRouter>
      <MantineProvider>
        {children}
      </MantineProvider>
    </BrowserRouter>
  );
}