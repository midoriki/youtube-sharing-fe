import { Container } from '@mantine/core';
import Register from '@components/Auth/Register';

export function Default () {
  function handleSubmit (params: {
    email: string,
    password: string,
    passwordConfirmation: string,
  }) {
    alert(JSON.stringify(params));
  }

  return (
    <Container>
      <Register onSubmit={handleSubmit} />
    </Container>
  );
}