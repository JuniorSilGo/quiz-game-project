import { Question as QuestionInterface } from '../../../domain/interfaces/question.interface';

export enum QuestionJobStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  DEAD_LETTER = 'DEAD_LETTER',
}

export interface QuestionGenerationMessage {
  jobId: string;
  topic: string;
  difficulty: string;
  quantity: number;
  attempt: number;
  maxAttempts: number;
  createdAt: string;
  lastAttemptAt?: string;
  correlationId?: string;
  error?: string;
}

export interface QuestionGenerationResult {
  jobId: string;
  status: QuestionJobStatus;
  questions: QuestionInterface[];
  attempt: number;
  completedAt: string;
  error?: string;
}

export interface QuestionJobMetadata {
  jobId: string;
  status: QuestionJobStatus;
  topic: string;
  difficulty: string;
  quantity: number;
  attempts: number;
  maxAttempts: number;
  createdAt: Date;
  updatedAt: Date;
  result?: QuestionInterface[];
  lastError?: string;
}
