export class QuestionPromptBuilder {
  private topic = '';
  private difficulty = '';
  private quantity = 1;
  private additionalInstructions = '';
  private formatExample?: string;

  withTopic(topic: string): this {
    this.topic = topic;
    return this;
  }

  withDifficulty(difficulty: string): this {
    this.difficulty = difficulty;
    return this;
  }

  withQuantity(quantity: number): this {
    this.quantity = quantity;
    return this;
  }

  withAdditionalInstructions(instructions: string): this {
    this.additionalInstructions = instructions;
    return this;
  }

  withFormatExample(example: string): this {
    this.formatExample = example;
    return this;
  }

  build(): string {
    const finalExample = (this.formatExample ?? this.createDefaultExample()).replace(
      /{{difficulty}}/g,
      this.difficulty || 'informada',
    );

    const basePrompt = [
      `Gere ${this.quantity} perguntas de múltipla escolha sobre "${this.topic}".`,
      `Nível de dificuldade: "${this.difficulty}".`,
      'Cada pergunta deve ter 4 alternativas (A, B, C, D) e uma resposta correta.',
      this.additionalInstructions,
      'Responda SOMENTE com JSON válido, sem explicações ou texto fora do JSON.',
      'Formato esperado:',
      finalExample,
    ]
      .filter(Boolean)
      .join('\n');

    return basePrompt.trim();
  }

  private createDefaultExample(): string {
    return `[
  {
    "question": "texto da pergunta",
    "options": {"A": "A", "B": "B", "C": "C", "D": "D"},
    "correctAnswer": "A",
    "difficulty": "{{difficulty}}"
  }
]`;
  }
}
