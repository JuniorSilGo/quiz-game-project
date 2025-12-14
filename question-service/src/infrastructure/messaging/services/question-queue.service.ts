import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { RabbitMQConnectionService } from './rabbitmq-connection.service';
import { RabbitMQConfig } from '../../../config/rabbitmq.config';
import {
  QuestionGenerationMessage,
  QuestionJobMetadata,
  QuestionJobStatus,
} from '../dto/question-message.dto';

@Injectable()
export class QuestionQueueService {
  private readonly logger = new Logger(QuestionQueueService.name);
  private readonly jobTracker = new Map<string, QuestionJobMetadata>();

  constructor(
    private readonly rabbitMQConnection: RabbitMQConnectionService,
  ) {}

  isAvailable(): boolean {
    return this.rabbitMQConnection.isAvailable();
  }

  async enqueueQuestionGeneration(
    topic: string,
    difficulty: string,
    quantity: number,
    correlationId?: string,
  ): Promise<QuestionJobMetadata | null> {
    if (!this.rabbitMQConnection.isAvailable()) {
      this.logger.warn('⚠️ RabbitMQ não disponível. Não é possível enfileirar.');
      return null;
    }

    const jobId = uuidv4();
    const now = new Date();

    const message: QuestionGenerationMessage = {
      jobId,
      topic,
      difficulty,
      quantity,
      attempt: 1,
      maxAttempts: RabbitMQConfig.retry.maxAttempts,
      createdAt: now.toISOString(),
      correlationId,
    };

    const metadata: QuestionJobMetadata = {
      jobId,
      status: QuestionJobStatus.PENDING,
      topic,
      difficulty,
      quantity,
      attempts: 0,
      maxAttempts: RabbitMQConfig.retry.maxAttempts,
      createdAt: now,
      updatedAt: now,
    };

    this.jobTracker.set(jobId, metadata);

    try {
      const channel = this.rabbitMQConnection.getChannel();
      if (!channel) {
        this.jobTracker.delete(jobId);
        return null;
      }
      
      channel.publish(
        RabbitMQConfig.exchanges.questions,
        RabbitMQConfig.routingKeys.generate,
        Buffer.from(JSON.stringify(message)),
        {
          persistent: true,
          contentType: 'application/json',
          correlationId,
          messageId: jobId,
          timestamp: Date.now(),
        },
      );

      this.logger.log(
        `📤 Job ${jobId} enfileirado: ${quantity} pergunta(s) sobre "${topic}" (${difficulty})`,
      );

      return metadata;
    } catch (error) {
      this.jobTracker.delete(jobId);
      this.logger.error(`❌ Erro ao enfileirar job ${jobId}:`, error);
      throw error;
    }
  }

  async enqueueRetry(message: QuestionGenerationMessage): Promise<void> {
    if (!this.rabbitMQConnection.isAvailable()) {
      this.logger.warn('⚠️ RabbitMQ não disponível. Não é possível reagendar.');
      return;
    }

    const { jobId, attempt } = message;
    const nextAttempt = attempt + 1;

    if (nextAttempt > message.maxAttempts) {
      this.logger.warn(
        `⚠️ Job ${jobId} atingiu máximo de tentativas (${message.maxAttempts}). Enviando para DLQ.`,
      );
      await this.sendToDeadLetter(message);
      return;
    }

    const delay = this.calculateBackoffDelay(nextAttempt);
    
    const retryMessage: QuestionGenerationMessage = {
      ...message,
      attempt: nextAttempt,
      lastAttemptAt: new Date().toISOString(),
    };

    try {
      const channel = this.rabbitMQConnection.getChannel();
      if (!channel) return;

      // Publica na fila de retry com delay
      channel.publish(
        RabbitMQConfig.exchanges.questions,
        RabbitMQConfig.routingKeys.retry,
        Buffer.from(JSON.stringify(retryMessage)),
        {
          persistent: true,
          contentType: 'application/json',
          messageId: jobId,
          expiration: delay.toString(),
        },
      );

      this.updateJobStatus(jobId, QuestionJobStatus.PENDING, nextAttempt - 1);

      this.logger.log(
        `🔄 Job ${jobId} reagendado para tentativa ${nextAttempt}/${message.maxAttempts} em ${delay}ms`,
      );
    } catch (error) {
      this.logger.error(`❌ Erro ao reagendar job ${jobId}:`, error);
      throw error;
    }
  }

  private async sendToDeadLetter(message: QuestionGenerationMessage): Promise<void> {
    try {
      const channel = this.rabbitMQConnection.getChannel();
      if (!channel) return;

      const dlqMessage = {
        ...message,
        failedAt: new Date().toISOString(),
        reason: 'Max attempts exceeded',
      };

      channel.publish(
        RabbitMQConfig.exchanges.deadLetter,
        RabbitMQConfig.routingKeys.deadLetter,
        Buffer.from(JSON.stringify(dlqMessage)),
        {
          persistent: true,
          contentType: 'application/json',
        },
      );

      this.updateJobStatus(message.jobId, QuestionJobStatus.DEAD_LETTER, message.attempt);

      this.logger.error(
        `💀 Job ${message.jobId} enviado para Dead Letter Queue após ${message.attempt} tentativas`,
      );
    } catch (error) {
      this.logger.error(`❌ Erro ao enviar job ${message.jobId} para DLQ:`, error);
    }
  }

  private calculateBackoffDelay(attempt: number): number {
    const { initialDelayMs, maxDelayMs, backoffMultiplier } = RabbitMQConfig.retry;
    const delay = initialDelayMs * Math.pow(backoffMultiplier, attempt - 1);
    return Math.min(delay, maxDelayMs);
  }

  updateJobStatus(
    jobId: string,
    status: QuestionJobStatus,
    attempts?: number,
    error?: string,
  ): void {
    const job = this.jobTracker.get(jobId);
    if (job) {
      job.status = status;
      job.updatedAt = new Date();
      if (attempts !== undefined) {
        job.attempts = attempts;
      }
      if (error) {
        job.lastError = error;
      }
    }
  }

  setJobResult(jobId: string, result: QuestionJobMetadata['result']): void {
    const job = this.jobTracker.get(jobId);
    if (job) {
      job.result = result;
      job.status = QuestionJobStatus.COMPLETED;
      job.updatedAt = new Date();
    }
  }

  getJobStatus(jobId: string): QuestionJobMetadata | undefined {
    return this.jobTracker.get(jobId);
  }

  getAllJobs(): QuestionJobMetadata[] {
    return Array.from(this.jobTracker.values());
  }

  cleanupOldJobs(olderThanMs: number = 3600000): number {
    const now = Date.now();
    let cleaned = 0;

    for (const [jobId, job] of this.jobTracker.entries()) {
      if (now - job.updatedAt.getTime() > olderThanMs) {
        this.jobTracker.delete(jobId);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      this.logger.log(`🧹 Removidos ${cleaned} jobs antigos do tracker`);
    }

    return cleaned;
  }
}
