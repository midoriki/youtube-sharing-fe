import React from 'react';
import { Container, Title } from '@mantine/core';
import { TIPages } from '@lib/test/testId';

export default function Home () {
  return (
    <Container data-testid={TIPages.home.default}>
      <Title>
        Home page
      </Title>
    </Container>
  );
}