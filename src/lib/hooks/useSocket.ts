import { useProfileStore } from '@lib/stores/ProfileStore';
import { useMemo, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { notifications } from '@mantine/notifications';
import { API_BASE_URL } from '@config/config';

export function useSocket () {
  const { user } = useProfileStore();

  const socket = useRef<Socket>();

  if (!socket.current) {
    socket.current = io(API_BASE_URL?.split('/api')[0] || '');
  }

  useMemo(() => {
    socket.current?.removeAllListeners('new-video-share');
    socket.current?.on('new-video-share', (data: { author: string, title: string }) => {
      if (user && user.email !== data.author) {
        notifications.show({
          title: 'An user has shared a new video',
          message: data.title,
        });
      }
    });
  }, [ user ]);
}