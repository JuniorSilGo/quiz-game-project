import { ResponseSanitizerHandler } from './response-sanitizer.handler';

export class JsonArraySanitizerHandler extends ResponseSanitizerHandler {
  protected handle(content: string): string | null {
    const direct = this.tryNormalize(content);
    if (direct) {
      return direct;
    }

    const start = content.indexOf('[');
    const end = content.lastIndexOf(']');
    if (start === -1 || end === -1 || end <= start) {
      return null;
    }

    const jsonSnippet = content.slice(start, end + 1);
    return this.tryNormalize(jsonSnippet);
  }

  private tryNormalize(payload: string): string | null {
    try {
      const parsed = JSON.parse(payload);
      if (Array.isArray(parsed)) {
        return JSON.stringify(parsed);
      }
      if (parsed && typeof parsed === 'object') {
        return JSON.stringify([parsed]);
      }
      return null;
    } catch {
      return null;
    }
  }
}
