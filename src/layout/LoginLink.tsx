import Login from '@components/Auth/Login';
import { Popover, Text } from '@mantine/core';
import React from 'react';
import { TILayout } from '@lib/test/testId';

const TILoginLink = TILayout.loginLink;

export default function LoginLink () {
  function handleLogin (params: {email: string, password: string}) {
    alert(JSON.stringify(params));
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