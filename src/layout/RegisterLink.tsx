import { Popover, Text } from '@mantine/core';
import React from 'react';
import Register from '@components/Auth/Register';
import { TILayout } from '@lib/test/testId';

const TLRegister = TILayout.registerLink;

export default function RegisterLink () {
  function handleRegister (params: {
    email: string,
    password: string,
    passwordConfirmation: string,
  }) {
    alert(JSON.stringify(params));
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