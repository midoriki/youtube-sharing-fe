import { Center, Container, Title } from '@mantine/core';

export default function NotFound () {
  return (
    <Container h={'100%'}>
      <Center h={'100%'}>
        <Title order={4} color="gray.6">404 | Sorry this page does not exist.</Title>
      </Center>
    </Container>
  );
}