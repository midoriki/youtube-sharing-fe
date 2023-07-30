import { Button, Group, Paper, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { extractVideoIdFromURL } from '@lib/utils/youtube';
import { TIComponents } from '@lib/test/testId';

const TIShareForm = TIComponents.pages.share.shareForm;

interface ShareFormProps {
  onSubmit: (url: string) => void
}

export default function ShareForm ({ onSubmit }: ShareFormProps) {
  const form = useForm({
    initialValues: {
      url: '',
    },
    validate: {
      url: (value) => extractVideoIdFromURL(value) !== '' ? null : 'Please enter a valid Youtube video URL!',
    },
  });
  function handleSubmit (values: { url: string }) {
    onSubmit(values.url);
  }
  return (
    <Paper shadow="lg" p="lg" data-testid={TIShareForm.default}>
      <Title mb="lg" order={4}>Share a Youtube video</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Youtube URL"
          data-testid={TIShareForm.urlInput}
          {...form.getInputProps('url')}
        />
        <Group position="center" mt="md">
          <Button type="submit" data-testid={TIShareForm.submitBtn}>Share</Button>
        </Group>
      </form>
    </Paper>
  );
}