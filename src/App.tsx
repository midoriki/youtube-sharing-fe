import React from 'react';
import { TIRoot } from '@lib/test/testId';
import { MantineProvider } from '@mantine/core';
import Layout from '@layout/Layout';

function App () {
  return (
    <div data-testid={TIRoot.default}>
      <MantineProvider withGlobalStyles withNormalizeCSS >
        <Layout />
      </MantineProvider>
    </div>
  );
}

export default App;
