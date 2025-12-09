import { DifficultyStrategy } from './difficulty-strategy';

export class MediumDifficultyStrategy implements DifficultyStrategy {
  readonly name = 'medium';

  getInstruction(quantity: number): string {
    return `As ${quantity} perguntas devem exigir raciocínio moderado, evitando respostas óbvias e equilibrando complexidade.`;
  }
}
