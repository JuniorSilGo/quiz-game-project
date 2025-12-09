import { DifficultyStrategy } from './difficulty-strategy';

export class EasyDifficultyStrategy implements DifficultyStrategy {
  readonly name = 'easy';

  getInstruction(quantity: number): string {
    return `Certifique-se de que as ${quantity} perguntas tenham linguagem simples, exemplos cotidianos e apenas uma alternativa obviamente correta.`;
  }
}
