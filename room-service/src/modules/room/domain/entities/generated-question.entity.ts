export class GeneratedQuestion {
  statement: string;
  alternatives: Record<string, string>;
  correctAnswer: string;

  constructor(props: GeneratedQuestion) {
    this.statement = props.statement;
    this.alternatives = props.alternatives;
    this.correctAnswer = props.correctAnswer;
  }

  static create(props: GeneratedQuestion) {
    return new GeneratedQuestion(props);
  }
}
