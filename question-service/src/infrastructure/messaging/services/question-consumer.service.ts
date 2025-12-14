import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';
import { RabbitMQConnectionService } from './rabbitmq-connection.service';
import { QuestionQueueService } from './question-queue.service';
import { RabbitMQConfig } from '../../../config/rabbitmq.config';
import {
  QuestionGenerationMessage,
  QuestionJobStatus,
} from '../dto/question-message.dto';
import { GenerateQuestionsUseCase } from '../../../application/use-cases/generate-questions.use-case';

@Injectable()
export class QuestionConsumerService implements OnModuleInit {
  private readonly logger = new Logger(QuestionConsumerService.name);

  constructor(
    private readonly rabbitMQConnection: RabbitMQConnectionService,
    private readonly questionQueueService: QuestionQueueService,
    private readonly generateQuestionsUseCase: GenerateQuestionsUseCase,
  ) {}

  async onModuleInit(): Promise<void> {
    // Aguarda um pouco para a conexão estar pronta
    await this.delay(1000);
    
    if (!this.rabbitMQConnection.isAvailable()) {
      this.logger.warn('⚠️ RabbitMQ não disponível. Consumer não será iniciado.');
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
        RabbitMQConfig.queues.questionGeneration,
        (msg) => this.handleMessage(msg),
        { noAck: RabbitMQConfig.consumer.noAck },
      );

      this.logger.log(
        `🎧 Consumer iniciado - escutando fila: ${RabbitMQConfig.queues.questionGeneration}`,
      );
    } catch (error) {
      this.logger.error('❌ Erro ao iniciar consumer:', error);
    }
  }

  private async handleMessage(msg: amqp.ConsumeMessage | null): Promise<void> {
    if (!msg) {
      return;
    }

    const channel = this.rabbitMQConnection.getChannel();
    if (!channel) return;
    
    let message: QuestionGenerationMessage;

    try {
      message = JSON.parse(msg.content.toString()) as QuestionGenerationMessage;
    } catch (parseError) {
      this.logger.error('❌ Erro ao parsear mensagem:', parseError);
      channel.reject(msg, false); // Não reenfileirar mensagem inválida
      return;
    }

    const { jobId, topic, difficulty, quantity, attempt, maxAttempts } = message;

    this.logger.log(
      `📥 Processando job ${jobId} - Tentativa ${attempt}/${maxAttempts}`,
    );

    this.questionQueueService.updateJobStatus(
      jobId,
      QuestionJobStatus.PROCESSING,
      attempt,
    );

    try {
      const result = await this.generateQuestionsUseCase.execute({
        topic,
        difficulty: difficulty as 'easy' | 'medium' | 'hard',
        quantity,
      });

      if (result.questions && result.questions.length > 0) {
        // Sucesso!
        this.questionQueueService.setJobResult(jobId, result.questions);
        channel.ack(msg);

        this.logger.log(
          `✅ Job ${jobId} concluído com sucesso - ${result.questions.length} perguntas geradas`,
        );
      } else {
        // Falhou na geração - agendar retry
        throw new Error('Nenhuma pergunta válida foi gerada');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      
      this.logger.warn(
        `⚠️ Job ${jobId} falhou na tentativa ${attempt}: ${errorMessage}`,
      );

      this.questionQueueService.updateJobStatus(
        jobId,
        QuestionJobStatus.FAILED,
        attempt,
        errorMessage,
      );

      // Acknowledge a mensagem atual
      channel.ack(msg);

      // Tentar retry
      const updatedMessage: QuestionGenerationMessage = {
        ...message,
        error: errorMessage,
      };

      await this.questionQueueService.enqueueRetry(updatedMessage);
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
