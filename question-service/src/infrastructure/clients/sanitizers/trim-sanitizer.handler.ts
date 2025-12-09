import { ResponseSanitizerHandler } from './response-sanitizer.handler';

export class TrimSanitizerHandler extends ResponseSanitizerHandler {
  protected handle(content: string): string | null {
    const trimmed = content.trim();
    return trimmed.length > 0 ? trimmed : null;
  }
}
