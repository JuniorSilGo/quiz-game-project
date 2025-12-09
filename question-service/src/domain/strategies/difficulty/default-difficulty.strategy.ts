import { DifficultyStrategy } from './difficulty-strategy';

export class DefaultDifficultyStrategy implements DifficultyStrategy {
  readonly name = 'default';

  getInstruction(quantity: number): string {
    return `As ${quantity} perguntas devem manter o mesmo nível de dificuldade informado, garantindo coerência entre enunciados e alternativas.`;
  }
}
