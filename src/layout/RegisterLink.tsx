import { Popover, Text } from '@mantine/core';
import Register from '@components/Auth/Register';
import { TILayout } from '@lib/test/testId';
import { register } from '@lib/api';
import useCheckProfile from '@lib/hooks/useCheckProfile';
import { notifications } from '@mantine/notifications';

const TLRegister = TILayout.registerLink;

export default function RegisterLink () {
  const checkProfile = useCheckProfile();

  async function handleRegister (params: {
    email: string,
    password: string,
    passwordConfirmation: string,
  }) {
    try {
      await register(params);
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
      withArrow shadow="md"
      data-testid={TLRegister.default}
    >
      <Popover.Target>
        <Text color="teal.7" fw="bold" sx={{ cursor: 'pointer' }}>Register</Text>
      </Popover.Target>
      <Popover.Dropdown>
        <Register onSubmit={handleRegister} />
      </Popover.Dropdown>
    </Popover>
  );
}