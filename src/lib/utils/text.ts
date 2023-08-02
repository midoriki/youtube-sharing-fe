import Dompurify from 'dompurify';
import { marked } from 'marked';

export function processFormattedText (text: string) {
  return Dompurify.sanitize(marked(text, { headerIds: false, mangle: false }));
}