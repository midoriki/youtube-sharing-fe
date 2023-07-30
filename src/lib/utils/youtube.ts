export function extractVideoIdFromURL (url: string): string {
  let matcher;
  if (url.includes('youtube.com')) {
    matcher = new RegExp(/youtube\.com.*v=(\w+)/);
  } else if (url.includes('youtu.be')) {
    matcher = new RegExp(/youtu\.be\/(\w+)/);
  }

  if (!matcher) {
    return '';
  }

  const match = url.match(matcher);

  return match ? match[1] : '';
}