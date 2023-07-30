import { Container, Title } from '@mantine/core';
import { TIPages } from '@lib/test/testId';

export default function Share () {
  return (
    <Container data-testid={TIPages.share.default}>
      <Title>Share a video</Title>
    </Container>
  );
}