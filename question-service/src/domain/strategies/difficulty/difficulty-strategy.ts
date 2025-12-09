export interface DifficultyStrategy {
  readonly name: string;
  getInstruction(quantity: number): string;
}
