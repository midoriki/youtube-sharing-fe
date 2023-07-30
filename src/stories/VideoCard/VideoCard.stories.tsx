import { Vote } from '@interfaces/VideoShare';
import VideoCard from '@components/VideoCard/VideoCard';
import { Container, Flex } from '@mantine/core';
import { genMockVideoShare } from '@lib/test/factory';

export function Default () {
  function handleVote (id: string, vote: Vote) {
    console.log(id, vote);
  }

  return (
    <Container>
      <Flex gap="30px" direction="column">
        <VideoCard videoShare={genMockVideoShare()} onVote={handleVote} />
        <VideoCard videoShare={genMockVideoShare(Vote.UP)} onVote={handleVote} />
        <VideoCard videoShare={genMockVideoShare(Vote.DOWN)} onVote={handleVote} />
      </Flex>
    </Container>
  );
}