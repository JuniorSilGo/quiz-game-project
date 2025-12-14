import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';
import { RabbitMQConnectionService } from './rabbitmq-connection.service';
import { QuestionQueueService } from './question-queue.service';
import { RabbitMQConfig } from '../../../config/rabbitmq.config';
import { QuestionGenerationMessage, QuestionJobStatus } from '../dto/question-message.dto';

export interface DeadLetterMessage extends QuestionGenerationMessage {
  failedAt: string;
  reason: string;
}

@Injectable()
export class DeadLetterHandlerService implements OnModuleInit {
  private readonly logger = new Logger(DeadLetterHandlerService.name);

  constructor(
    private readonly rabbitMQConnection: RabbitMQConnectionService,
    private readonly questionQueueService: QuestionQueueService,
  ) {}

  async onModuleInit(): Promise<void> {
    // Aguarda um pouco para a conexão estar pronta
    await this.delay(1000);
    
    if (!this.rabbitMQConnection.isAvailable()) {
      this.logger.warn('⚠️ RabbitMQ não disponível. Dead Letter Handler não será iniciado.');
      return;
    }

    await this.startConsuming();
  }

  private async startConsuming(): Promise<void> {
    try {
      const channel = this.rabbitMQConnection.getChannel();
      if (!channel) {
        this.logger.warn('⚠️ Canal RabbitMQ não disponível.');
        return;
      }

      await channel.consume(
        RabbitMQConfig.queues.questionDeadLetter,
        (msg) => this.handleDeadLetter(msg),
        { noAck: false },
      );

      this.logger.log(
        `💀 Dead Letter Handler iniciado - escutando fila: ${RabbitMQConfig.queues.questionDeadLetter}`,
      );
    } catch (error) {
      this.logger.error('❌ Erro ao iniciar Dead Letter Handler:', error);
    }
  }

  private async handleDeadLetter(msg: amqp.ConsumeMessage | null): Promise<void> {
    if (!msg) {
      return;
    }

    const channel = this.rabbitMQConnection.getChannel();
    if (!channel) return;
    
    let message: DeadLetterMessage;

    try {
      message = JSON.parse(msg.content.toString()) as DeadLetterMessage;
    } catch (parseError) {
      this.logger.error('❌ Erro ao parsear mensagem DLQ:', parseError);
      channel.ack(msg);
      return;
    }

    const { jobId, topic, difficulty, quantity, attempt, failedAt, reason, error } = message;

    this.logger.error(`
💀 ═══════════════════════════════════════════════════════════
   DEAD LETTER MESSAGE RECEIVED
   ───────────────────────────────────────────────────────────
   Job ID:      ${jobId}
   Topic:       ${topic}
   Difficulty:  ${difficulty}
   Quantity:    ${quantity}
   Attempts:    ${attempt}
   Failed At:   ${failedAt}
   Reason:      ${reason}
   Last Error:  ${error ?? 'N/A'}
═══════════════════════════════════════════════════════════════
    `);

    // Atualiza status no tracker
    this.questionQueueService.updateJobStatus(
      jobId,
      QuestionJobStatus.DEAD_LETTER,
      attempt,
      `${reason}: ${error ?? 'Unknown error'}`,
    );

    // Aqui você pode adicionar lógica adicional como:
    // - Enviar notificação (email, Slack, etc.)
    // - Salvar em banco de dados para análise posterior
    // - Tentar uma estratégia alternativa de geração

    // Por agora, apenas loga e acknowledges a mensagem
    await this.handleFailedJob(message);

    channel.ack(msg);
  }

  private async handleFailedJob(message: DeadLetterMessage): Promise<void> {
    // Estratégia de fallback: pode-se implementar aqui alternativas como:
    // 1. Usar um modelo de IA diferente
    // 2. Usar perguntas pré-cadastradas
    // 3. Notificar administradores
    // 4. Salvar para processamento manual posterior

    this.logger.warn(
      `📋 Job ${message.jobId} marcado para revisão manual. ` +
      `Tentativa de gerar ${message.quantity} pergunta(s) sobre "${message.topic}" falhou após ${message.attempt} tentativas.`,
    );

    // Exemplo: persistir em memória para consulta posterior
    // Em produção, isso seria salvo em um banco de dados
    const failedJobsStore = this.getFailedJobsStore();
    failedJobsStore.set(message.jobId, {
      ...message,
      processedAt: new Date().toISOString(),
      requiresManualReview: true,
    });
  }

  // Store em memória para jobs falhos (em produção, usar banco de dados)
  private failedJobsStore = new Map<string, DeadLetterMessage & { processedAt: string; requiresManualReview: boolean }>();

  private getFailedJobsStore() {
    return this.failedJobsStore;
  }

  getFailedJobs(): Array<DeadLetterMessage & { processedAt: string; requiresManualReview: boolean }> {
    return Array.from(this.failedJobsStore.values());
  }

  getFailedJob(jobId: string) {
    return this.failedJobsStore.get(jobId);
  }

  async retryFailedJob(jobId: string): Promise<boolean> {
    const failedJob = this.failedJobsStore.get(jobId);
    
    if (!failedJob) {
      this.logger.warn(`Job ${jobId} não encontrado na DLQ`);
      return false;
    }

    try {
      // Re-enfileira o job para nova tentativa
      await this.questionQueueService.enqueueQuestionGeneration(
        failedJob.topic,
        failedJob.difficulty,
        failedJob.quantity,
        failedJob.correlationId,
      );

      // Remove da lista de falhos
      this.failedJobsStore.delete(jobId);

      this.logger.log(`✅ Job ${jobId} reenfileirado para nova tentativa`);
      return true;
    } catch (error) {
      this.logger.error(`❌ Erro ao reenfileirar job ${jobId}:`, error);
      return false;
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
