import { extractVideoIdFromURL } from '@lib/utils/youtube';

describe('utils youtube', () => {
  it('extract ID from url', () => {
    const id = 'Wc6twNQvTyw';
    let url = `https://www.youtube.com/watch?v=${id}`;
    expect(extractVideoIdFromURL(url)).toBe(id);

    url = `https://youtu.be/${id}?t=250`;
    expect(extractVideoIdFromURL(url)).toBe(id);

    url = `https://www.youtube.com/watch?time_continue=2&v=${id}&embeds_referring_euri=https%3A%2F%2Fduckduckgo.com%2F&feature=emb_title`;
    expect(extractVideoIdFromURL(url)).toBe(id);
  });
});