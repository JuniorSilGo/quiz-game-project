import { ResponseSanitizerHandler } from './response-sanitizer.handler';
import { TrimSanitizerHandler } from './trim-sanitizer.handler';
import { ArtifactSanitizerHandler } from './artifact-sanitizer.handler';
import { JsonArraySanitizerHandler } from './json-array-sanitizer.handler';

export class SanitizerPipelineFactory {
  static create(): ResponseSanitizerHandler {
    const trim = new TrimSanitizerHandler();
    const artifact = new ArtifactSanitizerHandler();
    const jsonArray = new JsonArraySanitizerHandler();

    trim.setNext(artifact).setNext(jsonArray);
    return trim;
  }
}
