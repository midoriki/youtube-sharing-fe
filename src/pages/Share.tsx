import { Container, Title } from '@mantine/core';
import { TI_SHARE_PAGE } from '@lib/utils/testId';

export default function Share () {
  return (
    <Container data-testid={TI_SHARE_PAGE}>
      <Title>Share a video</Title>
    </Container>
  );
}