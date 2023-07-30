import VideoShare, { Vote } from '@interfaces/VideoShare';
import { faker } from '@faker-js/faker';

export const genMockVideoShare = (vote: Vote | null = null): VideoShare => ({
  id: faker.string.uuid(),
  url: 'https://www.youtube.com/watch?v=Wc6twNQvTyw',
  title: faker.lorem.sentence({ min: 20, max: 40 }),
  description: faker.lorem.paragraphs(5),
  upvote: faker.number.int(100),
  downvote: faker.number.int(100),
  author: faker.internet.email(),
  voted: vote,
});
