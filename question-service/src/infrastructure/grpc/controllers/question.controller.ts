import { Controller, Inject, Optional } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GenerateQuestionDto } from '../../../application/dto/generate-question.dto';
import { GenerateQuestionsUseCase } from '../../../application/use-cases/generate-questions.use-case';
import { QuestionQueueService } from '../../messaging/services/question-queue.service';
import { DeadLetterHandlerService } from '../../messaging/services/dead-letter-handler.service';
import { QuestionJobStatus } from '../../messaging/dto/question-message.dto';

interface JobStatusRequest {
  jobId: string;
}

interface RetryJobRequest {
  jobId: string;
}

@Controller()
export class QuestionController {
  constructor(
    private readonly generateQuestionsUseCase: GenerateQuestionsUseCase,
    @Optional() @Inject(QuestionQueueService)
    private readonly questionQueueService?: QuestionQueueService,
    @Optional() @Inject(DeadLetterHandlerService)
    private readonly deadLetterHandler?: DeadLetterHandlerService,
  ) {}

  // Método síncrono original (mantido para compatibilidade)
  @GrpcMethod('QuestionService', 'GenerateQuestions')
  async generateQuestions(data: GenerateQuestionDto) {
    return this.generateQuestionsUseCase.execute(data);
  }

  // Enfileira geração assíncrona
  @GrpcMethod('QuestionService', 'EnqueueQuestionGeneration')
  async enqueueQuestionGeneration(data: GenerateQuestionDto & { correlationId?: string }) {
    if (!this.questionQueueService) {
      return {
        jobId: '',
        status: 'ERROR',
        message: 'RabbitMQ não está configurado',
      };
    }

    try {
      const job = await this.questionQueueService.enqueueQuestionGeneration(
        data.topic,
        data.difficulty,
        data.quantity ?? 1,
        data.correlationId,
      );

      if (!job) {
        return {
          jobId: '',
          status: 'ERROR',
          message: 'RabbitMQ não está disponível',
        };
      }

      return {
        jobId: job.jobId,
        status: job.status,
        message: `Job enfileirado com sucesso. ${job.maxAttempts} tentativas disponíveis.`,
      };
    } catch (error) {
      return {
        jobId: '',
        status: 'ERROR',
        message: error instanceof Error ? error.message : 'Erro ao enfileirar job',
      };
    }
  }

  // Consulta status de um job
  @GrpcMethod('QuestionService', 'GetJobStatus')
  async getJobStatus(data: JobStatusRequest) {
    if (!this.questionQueueService) {
      return this.createEmptyJobResponse(data.jobId, 'RabbitMQ não configurado');
    }

    const job = this.questionQueueService.getJobStatus(data.jobId);

    if (!job) {
      // Verifica se está na DLQ
      const failedJob = this.deadLetterHandler?.getFailedJob(data.jobId);
      if (failedJob) {
        return {
          jobId: failedJob.jobId,
          status: QuestionJobStatus.DEAD_LETTER,
          topic: failedJob.topic,
          difficulty: failedJob.difficulty,
          quantity: failedJob.quantity,
          attempts: failedJob.attempt,
          maxAttempts: failedJob.maxAttempts,
          createdAt: failedJob.createdAt,
          updatedAt: failedJob.processedAt,
          questions: [],
          lastError: failedJob.error ?? failedJob.reason,
        };
      }

      return this.createEmptyJobResponse(data.jobId, 'Job não encontrado');
    }

    return {
      jobId: job.jobId,
      status: job.status,
      topic: job.topic,
      difficulty: job.difficulty,
      quantity: job.quantity,
      attempts: job.attempts,
      maxAttempts: job.maxAttempts,
      createdAt: job.createdAt.toISOString(),
      updatedAt: job.updatedAt.toISOString(),
      questions: job.result?.map((q) => ({
        statement: q.statement,
        alternatives: q.alternatives,
        correctAnswer: q.correctAnswer,
      })) ?? [],
      lastError: job.lastError ?? '',
    };
  }

  // Lista todos os jobs
  @GrpcMethod('QuestionService', 'GetAllJobs')
  async getAllJobs() {
    if (!this.questionQueueService) {
      return { jobs: [] };
    }

    const jobs = this.questionQueueService.getAllJobs();
    const failedJobs = this.deadLetterHandler?.getFailedJobs() ?? [];

    const allJobs = [
      ...jobs.map((job) => ({
        jobId: job.jobId,
        status: job.status,
        topic: job.topic,
        difficulty: job.difficulty,
        quantity: job.quantity,
        attempts: job.attempts,
        maxAttempts: job.maxAttempts,
        createdAt: job.createdAt.toISOString(),
        updatedAt: job.updatedAt.toISOString(),
        questions: job.result?.map((q) => ({
          statement: q.statement,
          alternatives: q.alternatives,
          correctAnswer: q.correctAnswer,
        })) ?? [],
        lastError: job.lastError ?? '',
      })),
      ...failedJobs.map((job) => ({
        jobId: job.jobId,
        status: QuestionJobStatus.DEAD_LETTER,
        topic: job.topic,
        difficulty: job.difficulty,
        quantity: job.quantity,
        attempts: job.attempt,
        maxAttempts: job.maxAttempts,
        createdAt: job.createdAt,
        updatedAt: job.processedAt,
        questions: [],
        lastError: job.error ?? job.reason,
      })),
    ];

    return { jobs: allJobs };
  }

  // Retry de um job falho
  @GrpcMethod('QuestionService', 'RetryFailedJob')
  async retryFailedJob(data: RetryJobRequest) {
    if (!this.deadLetterHandler) {
      return {
        success: false,
        message: 'RabbitMQ não está configurado',
        newJobId: '',
      };
    }

    const success = await this.deadLetterHandler.retryFailedJob(data.jobId);

    if (success) {
      return {
        success: true,
        message: 'Job reenfileirado com sucesso',
        newJobId: data.jobId,
      };
    }

    return {
      success: false,
      message: 'Job não encontrado na DLQ ou erro ao reenfileirar',
      newJobId: '',
    };
  }

  private createEmptyJobResponse(jobId: string, error: string) {
    return {
      jobId,
      status: 'NOT_FOUND',
      topic: '',
      difficulty: '',
      quantity: 0,
      attempts: 0,
      maxAttempts: 0,
      createdAt: '',
      updatedAt: '',
      questions: [],
      lastError: error,
    };
  }
}
