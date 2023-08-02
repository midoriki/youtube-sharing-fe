import { processFormattedText } from './text';

describe('utils text', () => {
  it('process formatted text', () => {
    const text = 'abcd\n123';
    const formatted = processFormattedText(text);
    expect(formatted).toContain(`abcd
123`);
  });
});