import Joi from 'joi';
import { useForm, joiResolver } from '@mantine/form';
import { Box, Button, Group, PasswordInput, TextInput } from '@mantine/core';
import { TIComponents } from '@lib/test/testId';

const TIRegister = TIComponents.auth.register;

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
    'any.required': 'Password is required',
    'string.min': 'Password is too short',
    'string.empty': 'Password can not be empty',
  }),
  passwordConfirmation: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.required': 'Repeat password is required',
      'any.only': 'Repeat password does not match',
    }),
});

interface RegisterProps {
  onSubmit: (params: {
    email: string;
    password: string;
    passwordConfirmation: string;
  }) => void;
}

export default function Register ({ onSubmit }: RegisterProps) {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    validate: joiResolver(schema),
  });
  function handleSubmit (values: {
    email: string;
    password: string;
    passwordConfirmation: string;
  }) {
    onSubmit(values);
  }
  return (
    <Box data-testid={TIRegister.default}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="Email"
          data-testid={TIRegister.emailInput}
          {...form.getInputProps('email')}
        />
        <PasswordInput
          withAsterisk
          label="Password"
          mt="sm"
          data-testid={TIRegister.passwordInput}
          {...form.getInputProps('password')}
        />
        <PasswordInput
          withAsterisk
          label="Repeat password"
          mt="sm"
          data-testid={TIRegister.passwordConfirmationInput}
          {...form.getInputProps('passwordConfirmation')}
        />
        <Group position="center" mt="xl">
          <Button type="submit" data-testid={TIRegister.submitBnt}>
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  );
}
