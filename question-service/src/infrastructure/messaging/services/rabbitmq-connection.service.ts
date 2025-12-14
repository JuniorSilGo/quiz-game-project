import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as amqp from 'amqplib';
import { RabbitMQConfig } from '../../../config/rabbitmq.config';

@Injectable()
export class RabbitMQConnectionService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RabbitMQConnectionService.name);
  private connection: amqp.ChannelModel | null = null;
  private channel: amqp.Channel | null = null;
  private isInitialized = false;
  private connectionFailed = false;

  async onModuleInit(): Promise<void> {
    await this.connect();
    if (this.connection) {
      await this.setupExchangesAndQueues();
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.close();
  }

  private async connect(): Promise<void> {
    try {
      this.logger.log('🔌 Conectando ao RabbitMQ...');
      this.connection = await amqp.connect(RabbitMQConfig.url);
      this.channel = await this.connection.createChannel();
      
      await this.channel.prefetch(RabbitMQConfig.consumer.prefetchCount);
      
      this.connection.on('error', (err) => {
        this.logger.error('❌ Erro na conexão RabbitMQ:', err.message);
      });

      this.connection.on('close', () => {
        this.logger.warn('⚠️ Conexão RabbitMQ fechada. Tentando reconectar...');
        this.reconnect();
      });

      this.connectionFailed = false;
      this.logger.log('✅ Conectado ao RabbitMQ com sucesso.');
    } catch (error) {
      this.connectionFailed = true;
      this.logger.warn('⚠️ RabbitMQ não disponível. O serviço funcionará sem filas (retry síncrono apenas).');
      this.logger.debug('Detalhes do erro:', error);
    }
  }

  private async reconnect(): Promise<void> {
    const maxRetries = 5;
    let retries = 0;

    while (retries < maxRetries) {
      try {
        this.logger.log(`🔄 Tentativa de reconexão ${retries + 1}/${maxRetries}...`);
        await this.connect();
        await this.setupExchangesAndQueues();
        return;
      } catch {
        retries++;
        await this.delay(Math.pow(2, retries) * 1000);
      }
    }

    this.logger.error('❌ Máximo de tentativas de reconexão atingido.');
  }

  private async setupExchangesAndQueues(): Promise<void> {
    if (!this.channel) {
      throw new Error('Canal RabbitMQ não disponível');
    }

    const { exchanges, queues, routingKeys, retry } = RabbitMQConfig;

    // Criar Dead Letter Exchange
    await this.channel.assertExchange(exchanges.deadLetter, 'direct', { durable: true });

    // Criar Exchange principal
    await this.channel.assertExchange(exchanges.questions, 'direct', { durable: true });

    // Criar Dead Letter Queue
    await this.channel.assertQueue(queues.questionDeadLetter, {
      durable: true,
    });
    await this.channel.bindQueue(
      queues.questionDeadLetter,
      exchanges.deadLetter,
      routingKeys.deadLetter,
    );

    // Criar Retry Queue com TTL e DLX de volta para a fila principal
    await this.channel.assertQueue(queues.questionRetry, {
      durable: true,
      arguments: {
        'x-dead-letter-exchange': exchanges.questions,
        'x-dead-letter-routing-key': routingKeys.generate,
        'x-message-ttl': retry.initialDelayMs,
      },
    });
    await this.channel.bindQueue(
      queues.questionRetry,
      exchanges.questions,
      routingKeys.retry,
    );

    // Criar fila principal de geração de perguntas
    await this.channel.assertQueue(queues.questionGeneration, {
      durable: true,
      arguments: {
        'x-dead-letter-exchange': exchanges.deadLetter,
        'x-dead-letter-routing-key': routingKeys.deadLetter,
      },
    });
    await this.channel.bindQueue(
      queues.questionGeneration,
      exchanges.questions,
      routingKeys.generate,
    );

    this.isInitialized = true;
    this.logger.log('✅ Exchanges e filas configuradas com sucesso.');
  }

  getChannel(): amqp.Channel | null {
    return this.channel;
  }

  isConnected(): boolean {
    return this.isInitialized && this.channel !== null && !this.connectionFailed;
  }

  isAvailable(): boolean {
    return !this.connectionFailed && this.channel !== null;
  }

  private async close(): Promise<void> {
    try {
      if (this.channel) {
        await this.channel.close();
        this.channel = null;
      }
      if (this.connection) {
        await this.connection.close();
        this.connection = null;
      }
      this.isInitialized = false;
      this.logger.log('✅ Conexão RabbitMQ fechada.');
    } catch (error) {
      this.logger.error('❌ Erro ao fechar conexão RabbitMQ:', error);
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
