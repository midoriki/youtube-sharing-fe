export function extractVideoIdFromURL (url: string): string {
  let matcher;
  if (url.includes('youtube.com')) {
    matcher = new RegExp(/youtube\.com.*v=([\w\-|_]+)/);
  } else if (url.includes('youtu.be')) {
    matcher = new RegExp(/youtu\.be\/([\w\-\_]+)/);
  }

  if (!matcher) {
    return '';
  }

  const match = url.match(matcher);

  return match ? match[1] : '';
}