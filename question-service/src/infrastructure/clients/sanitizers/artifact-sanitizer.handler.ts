import { ResponseSanitizerHandler } from './response-sanitizer.handler';

export class ArtifactSanitizerHandler extends ResponseSanitizerHandler {
  protected handle(content: string): string | null {
    const cleaned = content
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .replace(/\[\/?B_INST\]/gi, '')
      .replace(/\[\/?B_INS\]/gi, '')
      .replace(/\[\/?INST\]/gi, '')
      .replace(/\[\/?BOT\]/gi, '')
      .replace(/\[\/?ASSISTANT\]/gi, '')
      .replace(/\[\/?ASSIST\]/gi, '')
      .replace(/\[\/?s\]/gi, '')
      .replace(/<\/?s>/gi, '')
      .replace(/<\/?BOS>/gi, '')
      .replace(/<\/?EOS>/gi, '')
      .replace(/\[\/?SYSTEM\]/gi, '')
      .replace(/\[\/?USER\]/gi, '')
      .trim();

    return cleaned.length > 0 ? cleaned : null;
  }
}
