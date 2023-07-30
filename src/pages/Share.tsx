import { Container } from '@mantine/core';
import { TIPages } from '@lib/test/testId';
import ShareForm from '@components/pages/share/ShareForm';

export default function Share () {
  function handleShare (url: string) {
    alert(url);
  }
  return (
    <Container data-testid={TIPages.share.default}>
      <ShareForm onSubmit={handleShare} />
    </Container>
  );
}