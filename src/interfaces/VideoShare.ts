export enum Vote {
  UP = 'up',
  DOWN = 'down'
}

export default interface VideoShare {
  id: string;
  title: string;
  description: string;
  url: string;
  author: string;
  upvote: number;
  downvote: number;
  voted: Vote | null;
}
