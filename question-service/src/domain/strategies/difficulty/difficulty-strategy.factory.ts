import { DifficultyStrategy } from './difficulty-strategy';
import { EasyDifficultyStrategy } from './easy-difficulty.strategy';
import { MediumDifficultyStrategy } from './medium-difficulty.strategy';
import { HardDifficultyStrategy } from './hard-difficulty.strategy';
import { DefaultDifficultyStrategy } from './default-difficulty.strategy';

export class DifficultyStrategyFactory {
  static create(difficulty?: string): DifficultyStrategy {
    if (!difficulty) {
      return new DefaultDifficultyStrategy();
    }

    const normalized = difficulty.toLowerCase();
    switch (normalized) {
      case 'easy':
      case 'facil':
        return new EasyDifficultyStrategy();
      case 'medium':
      case 'medio':
        return new MediumDifficultyStrategy();
      case 'hard':
      case 'dificil':
        return new HardDifficultyStrategy();
      default:
        return new DefaultDifficultyStrategy();
    }
  }
}
