import { DifficultyStrategy } from './difficulty-strategy';

export class HardDifficultyStrategy implements DifficultyStrategy {
  readonly name = 'hard';

  getInstruction(quantity: number): string {
    return `As ${quantity} perguntas devem explorar conceitos avançados, incluir pegadinhas sutis e exigir comparação entre alternativas.`;
  }
}
