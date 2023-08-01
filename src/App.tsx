import { TIRoot } from '@lib/test/testId';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import Layout from '@layout/Layout';

function App () {
  return (
    <div data-testid={TIRoot.default}>
      <MantineProvider withGlobalStyles withNormalizeCSS >
        <Notifications />
        <Layout />
      </MantineProvider>
    </div>
  );
}

export default App;
