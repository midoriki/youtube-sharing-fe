import { TIRoot } from '@lib/test/testId';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import Layout from '@layout/Layout';
import useCheckProfile from '@lib/hooks/useCheckProfile';
import { useSocket } from '@lib/hooks/useSocket';
import { useEffect } from 'react';

function App () {
  useSocket();
  const checkProfile = useCheckProfile();
  useEffect(() => {
    checkProfile();
  }, []);
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
