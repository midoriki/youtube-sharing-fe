import React from 'react';
import { Container, Title } from '@mantine/core';
import { TI_HOME_PAGE } from '@lib/utils/testId';
import { Link } from 'react-router-dom';

export default function Home () {
  return (
    <Container data-testid={TI_HOME_PAGE}>
      <Title>
        Home page
      </Title>
      <Link to={'/share'}>Share a video</Link>
    </Container>
  );
}