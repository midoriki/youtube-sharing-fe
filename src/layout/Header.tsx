import { Text, Flex, Group, Header as MantineHeader, Center } from '@mantine/core';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import LoginLink from '@layout/LoginLink';
import RegisterLink from '@layout/RegisterLink';
import { useProfileStore } from '@lib/stores/ProfileStore';
import Avatar from './Avatar';

const LinkWrapper = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.teal[7]};
  font-weight: bold;
`;
export default function Header () {
  const user = useProfileStore((state) => state.user);

  return (
    <MantineHeader height={60}>
      <Group sx={{ height: '100%' }} px={20} position="apart">
        <LinkWrapper to={'/'} style={{ fontSize: '30px' }}>Funny Youtube Videos</LinkWrapper>
        <Flex direction="row" gap="md">
          {user ? (
            <>
              <Center>
                <LinkWrapper to="/share">Share a video</LinkWrapper>
              </Center>
              <Avatar />
            </>
          ) : null }
          {!user ? (
            <>
              <LoginLink />
              <RegisterLink />
            </>
          ) : null}
        </Flex>
      </Group>
    </MantineHeader>
  );
}