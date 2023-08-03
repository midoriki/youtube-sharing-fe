import { Flex, Group, Header as MantineHeader, Center, Box } from '@mantine/core';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import LoginLink from '@layout/LoginLink';
import RegisterLink from '@layout/RegisterLink';
import { useProfileStore } from '@lib/stores/ProfileStore';
import Avatar from './Avatar';
import { useMediaQuery } from '@mantine/hooks';
import { IconHome } from '@tabler/icons-react';
import { TILayout } from '@lib/test/testId';

const TIHeader = TILayout.header;

const LinkWrapper = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.teal[7]};
  font-weight: bold;
`;
export default function Header () {
  const { user } = useProfileStore((state) => state);

  const matches = useMediaQuery('(max-width: 530px)');

  return (
    <MantineHeader height={60} data-testid={TIHeader.default}>
      <Group sx={{ height: '100%' }} px={20} position="apart">
        <LinkWrapper to={'/'} style={{ fontSize: '30px' }}>
          {
            matches ? 
              <IconHome size="30px" data-testid={TIHeader.homeIcon} /> :
              <Box data-testid={TIHeader.title}>Funny Youtube Videos</Box>
          }
        </LinkWrapper>
        <Flex direction="row" gap="md">
          {user ? (
            <>
              <Center data-testid={TIHeader.share}>
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