import React from 'react';
import { AppShell } from '@mantine/core';
import { TI_HOME_PAGE } from '@lib/utils/testId';

export default function Home () {
  return (
    <AppShell
      padding="md"
      data-testid={TI_HOME_PAGE}
    >
			Youtube sharing app
    </AppShell>
  );
}