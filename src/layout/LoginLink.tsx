import Login from '@components/Auth/Login';
import { Popover, Text } from '@mantine/core';
import { TILayout } from '@lib/test/testId';
import { login } from '@lib/api';
import { notifications } from '@mantine/notifications';
import useCheckProfile from '@lib/hooks/useCheckProfile';

const TILoginLink = TILayout.loginLink;

export default function LoginLink () {
  const checkProfile = useCheckProfile();
  async function handleLogin (params: {email: string, password: string}) {
    try {
      await login(params);
      await checkProfile();
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