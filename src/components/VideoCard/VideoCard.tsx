import { ActionIcon, Flex, Paper, Text, Title } from '@mantine/core';
import VideoShare, { Vote } from '@interfaces/VideoShare';
import YouTube from 'react-youtube';
import { IconThumbDown, IconThumbUp } from '@tabler/icons-react';
import { useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { TIComponents } from '@lib/test/testId';
import { processFormattedText } from '@lib/utils/text';

const TIVideoCard = TIComponents.videoCard;

interface VideoCardProps {
  videoShare: VideoShare;
  onVote: (id: string, vote: Vote) => void;
}
export default function VideoCard ({ videoShare, onVote }: VideoCardProps) {
  const [ descriptionClamp, setDescriptionClamp ] = useState(true);
  const [ titleClamp, setTitleClamp ] = useState(true);

  const matches = useMediaQuery('(max-width: 780px)');

  function handleVote (vote: Vote) {
    onVote(videoShare.id, vote);
  }

  return (
    <Paper shadow="lg" p="lg" data-testid={TIVideoCard.default}>
      <Flex gap="40px" direction={matches ? 'column' : 'row'}>
        <YouTube opts={{ height: 300, width: matches ? '100%' : 400 }} videoId={videoShare.videoId} />
        <Flex gap="xs" direction="column" miw={0} sx={{ overflow: 'hidden' }}>
          <Title
            lineClamp={titleClamp ? 4 : 0}
            onClick={() => setTitleClamp(!titleClamp)}
            order={4}
            data-testid={TIVideoCard.title}
          >
            {videoShare.title}
          </Title>
          <Text truncate data-testid={TIVideoCard.author}>{videoShare.author}</Text>
          <Flex direction="row" gap="10px">
            <Flex direction="row">
              <Text data-testid={TIVideoCard.upvote}>{videoShare.upvote}</Text>
              <ActionIcon
                color={videoShare.voted === Vote.UP ? 'blue.3' : 'gray.7'}
                onClick={() => handleVote(Vote.UP)}
                data-testid={TIVideoCard.upvoteBtn}
              >
                <IconThumbUp />
              </ActionIcon>
            </Flex>
            <Flex direction="row" align="center">
              <Text data-testid={TIVideoCard.downvote}>{videoShare.downvote}</Text>
              <ActionIcon
                color={videoShare.voted === Vote.DOWN ? 'blue.3' : 'gray.7'}
                onClick={() => handleVote(Vote.DOWN)}
                data-testid={TIVideoCard.downvoteBtn}
              >
                <IconThumbDown />
              </ActionIcon>
            </Flex>
          </Flex>
          <Flex direction="column">
            <Text fw={600} truncate>Description:</Text>
            <Text
              lineClamp={descriptionClamp ? 4 : 0}
              onClick={() => setDescriptionClamp(!descriptionClamp)}
              data-testid={TIVideoCard.description}
              dangerouslySetInnerHTML={{ __html: processFormattedText(videoShare.description) }}
            >
              {}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Paper>
  );
}