import { Api } from '@lib/api';
import { useProfileStore } from '@lib/stores/ProfileStore';
import { Popover, Avatar as MantineAvatar, Box, NavLink } from '@mantine/core';
import { TILayout } from '@lib/test/testId';
import { clearToken } from '@lib/auth/storage';

const TIAvatar = TILayout.avatar;

export default function Avatar () {
  const { user, setUser } = useProfileStore((state) => state);

  function handleLogout () {
    setUser(null);
    Api.token = null;
    clearToken();
  }

  return (
    <Popover
      width={300}
      trapFocus
      position="bottom"
      withArrow
      shadow="md"
      data-testid={TIAvatar.default}
    >
      <Popover.Target>
        <MantineAvatar sx={{ cursor: 'pointer' }} radius="xl" color="teal.9" />
      </Popover.Target>
      <Popover.Dropdown>
        <Box>
          <NavLink data-testid={TIAvatar.email} label={user?.email} />
          <NavLink data-testid={TIAvatar.logout} label="Logout" onClick={handleLogout} />
        </Box>
      </Popover.Dropdown>
    </Popover>
  );
}