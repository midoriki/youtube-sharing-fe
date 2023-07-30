import { Container } from '@mantine/core';
import Login from '@components/Auth/Login';

export function Default () {
  function handleSubmit (params: {email: string, password: string}) {
    alert(JSON.stringify(params));
  }

  return (
    <Container>
      <Login onSubmit={handleSubmit} />
    </Container>
  );
}