export enum Vote {
  UP = 'up',
  DOWN = 'down'
}

interface VideoShare {
  id: string;
  videoId: string;
  title: string;
  description: string;
  url: string;
  author: string;
  upvote: number;
  downvote: number;
  voted: Vote | null;
}

export default VideoShare;