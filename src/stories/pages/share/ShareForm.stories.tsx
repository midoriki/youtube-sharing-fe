import ShareForm from '@components/pages/share/ShareForm';
import { Container, MantineProvider } from '@mantine/core';

export function Default () {
  function handleSubmit (url: string) {
    alert(url);
  }
  return (
    <Container>
      <ShareForm onSubmit={handleSubmit} />
    </Container>
  );
}