export abstract class ResponseSanitizerHandler {
  private nextHandler?: ResponseSanitizerHandler;

  setNext(handler: ResponseSanitizerHandler): ResponseSanitizerHandler {
    this.nextHandler = handler;
    return handler;
  }

  sanitize(content: string | null | undefined): string | null {
    if (content == null) {
      return null;
    }

    const handled = this.handle(content);
    if (handled == null) {
      return null;
    }

    if (this.nextHandler) {
      return this.nextHandler.sanitize(handled);
    }

    return handled;
  }

  protected abstract handle(content: string): string | null;
}
