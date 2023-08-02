import { Text, Container, Flex, Select, Center, Pagination } from '@mantine/core';
import { TIPages } from '@lib/test/testId';
import { useVideoShareStore } from '@lib/stores/VideoShareStore';
import { useEffect } from 'react';
import { getAllVideoShares, vote } from '@lib/api';
import VideoCard from '@components/VideoCard/VideoCard';
import { Vote } from '@interfaces/VideoShare';
import { notifications } from '@mantine/notifications';
import { useProfileStore } from '@lib/stores/ProfileStore';

const PER_PAGE_OPTIONS = [
  { value: '5', label: '5' },
  { value: '10', label: '10' },
  { value: '20', label: '20' },
  { value: '50', label: '50' },
  { value: '100', label: '100' },
];

export default function Home () {
  const { user } = useProfileStore((state) => state);
  const { 
    videoShares, 
    setVideoShares, 
    totalPage, 
    setTotalPage, 
    paging,
    setPaging,
  } = useVideoShareStore((state) => state);

  function handlePerPageChange (value: string) {
    setPaging({ page: 1, perPage: parseInt(value) });
  }

  async function fetchVideoShares () {
    const { data } = await getAllVideoShares(paging);
    setVideoShares(data.data);
    setTotalPage(data.totalPage);
  }

  useEffect(() => {
    (async () => {
      await fetchVideoShares();
      window.scrollTo(0, 0);
    })();
  }, [ paging, user ]);

  async function handleVote (videoShareId: string, type: Vote) {
    if (!user) {
      notifications.show({
        message: 'Please login to give your impression',
        color: 'blue',
      });
      return;
    }
    try {
      const { data } = await vote({
        videoShareId,
        type: type,
      });
      if (data.success && data.message) {
        notifications.show({
          message: data.message,
          color: 'teal',
        });
        await fetchVideoShares();
      }
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
    <Container data-testid={TIPages.home.default}>
      <Flex direction="column" gap="xl">
        <Flex justify="flex-end">
          { videoShares.length > 0 ? (
            <Select 
              value={paging.perPage.toString()} 
              label="Number of videos per page" 
              data={PER_PAGE_OPTIONS}
              onChange={handlePerPageChange}
              data-testid={TIPages.home.perPageSelector}
            />
          ) : null }
        </Flex>
        <Flex direction="column" gap="xl">
          {
            videoShares.length > 0 ? (
              videoShares.map((v, id) => (
                <VideoCard key={id} onVote={handleVote} videoShare={v} />
              ))
            ) : (
              <Text data-testid={TIPages.home.empty}>
                Hmm the list is empty. Be the first to share a funny video!
              </Text>
            )
          }
        </Flex>
        <Center>
          { videoShares.length > 0 ? (
            <Pagination 
              data-testid={TIPages.home.pagination} 
              value={paging.page} 
              onChange={(page) => setPaging({ ...paging, page })}
              total={totalPage} 
            />
          ) : null }
        </Center>
      </Flex>
    </Container>
  );
}