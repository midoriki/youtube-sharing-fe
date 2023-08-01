import Login from '@components/Auth/Login';
import { Popover, Text } from '@mantine/core';
import { TILayout } from '@lib/test/testId';
import api, { Api } from '@lib/api';
import { notifications } from '@mantine/notifications';

const TILoginLink = TILayout.loginLink;

export default function LoginLink () {
  async function handleLogin (params: {email: string, password: string}) {
    try {
      const { data } = await api.post('/auth/login', params);
      if (data.token) {
        Api.token = data.token;
        const { data: { user } } = await api.get('/profile');
        console.log('user', user);
      }
    } catch (e: any) {
      if (e?.data?.message) {
        notifications.show({
          message: e?.data?.message,
          color: 'red',
        });
      }
    }
  }
  return (
    <Popover
      width={300}
      trapFocus
      position="bottom"
      withArrow
      shadow="md"
      data-testid={TILoginLink.default}
    >
      <Popover.Target>
        <Text
          color="teal.7"
          fw="bold"
          sx={{ cursor: 'pointer' }}
        >
          Login
        </Text>
      </Popover.Target>
      <Popover.Dropdown>
        <Login onSubmit={handleLogin} />
      </Popover.Dropdown>
    </Popover>
  );
}