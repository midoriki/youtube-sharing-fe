import React from 'react';
import { TI_APP_ROOT } from '@lib/utils/testId';
import { MantineProvider } from '@mantine/core';
import Layout from '@layout/Layout';

function App () {
  return (
    <div data-testid={TI_APP_ROOT}>
      <MantineProvider withGlobalStyles withNormalizeCSS >
        <Layout />
      </MantineProvider>
    </div>
  );
}

export default App;
