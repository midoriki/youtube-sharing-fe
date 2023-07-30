import React from 'react';
import { TI_APP_ROOT } from '@lib/utils/testId';
import Home from '@pages/Home';
import { MantineProvider } from '@mantine/core';

function App () {
  return (
    <div data-testid={TI_APP_ROOT}>
      <MantineProvider withGlobalStyles withNormalizeCSS >
        <Home />
      </MantineProvider>
    </div>
  );
}

export default App;
