import Joi from 'joi';
import { useForm, joiResolver } from '@mantine/form';
import { Box, Button, Group, PasswordInput, TextInput } from '@mantine/core';
import { TIComponents } from '@lib/test/testId';

const TIInput = TIComponents.auth.login;

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'any.required': 'Email is required',
      'string.email': 'Email is invalid',
      'string.empty': 'Email can not be empty',
    }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'Email is required',
    'string.min': 'Password is too short',
    'string.empty': 'Password can not be empty',
  }),
});

interface LoginProps {
  onSubmit: (params: {email: string, password: string}) => void
}

export default function Login ({ onSubmit }: LoginProps) {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: joiResolver(schema),
  });
  function handleSubmit (values: { email: string, password: string}) {
    onSubmit(values);
  }
  return (
    <Box data-testid={TIInput.default}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="Email"
          data-testid={TIInput.emailInput}
          {...form.getInputProps('email')}
        />
        <PasswordInput
          withAsterisk
          label="Password"
          mt="sm"
          data-testid={TIInput.passwordInput}
          {...form.getInputProps('password')}
        />
        <Group position="center" mt="xl">
          <Button type="submit" data-testid={TIInput.submitBnt}>Submit</Button>
        </Group>
      </form>
    </Box>
  );
}