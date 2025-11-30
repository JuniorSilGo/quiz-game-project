import { GeneratedQuestion } from './generated-question.vo';

export class Match {
  constructor(
    public readonly roomName: string,
    public readonly ownerUserId: number,
    public readonly userPlayersIds: number[],
    public readonly questions: GeneratedQuestion[],
    public readonly difficulty: string,
    public readonly topic: string,
    public currentRound: number = 1,
    public scores: Map<number, number> = new Map(),
    public answeredByRound: Map<number, Set<number>> = new Map(),
    public roundEndsAt?: Date,
  ) {}
}
