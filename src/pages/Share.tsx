import { Container } from '@mantine/core';
import { TIPages } from '@lib/test/testId';
import ShareForm from '@components/pages/share/ShareForm';
import { shareVideo } from '@lib/api';
import { notifications } from '@mantine/notifications';

export default function Share () {
  async function handleShare (url: string) {
    try {
      const response = await shareVideo(url);
      if (response.data.message) {
        notifications.show({
          message: response.data.message,
          color: 'teal',
        });
      }
    } catch (e: any) {
      if (e?.response?.data?.message) {
        notifications.show({
          message: e?.response?.data?.message,
          color: 'red',
        });
      }
    }
  }
  return (
    <Container data-testid={TIPages.share.default}>
      <ShareForm onSubmit={handleShare} />
    </Container>
  );
}