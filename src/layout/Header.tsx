import { Group, Header as MantineHeader } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const LinkWrapper = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.teal[7]};
  font-weight: bold;
  font-size: 30px;
`;
export default function Header () {
  return (
    <MantineHeader height={60}>
      <Group sx={{ height: '100%' }} px={20} position="apart">
        <LinkWrapper to={'/'}>Funny Youtube Videos</LinkWrapper>
      </Group>
    </MantineHeader>
  );
}