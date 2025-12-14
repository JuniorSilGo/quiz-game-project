export const RabbitMQConfig = {
  // Conexão
  url: process.env.RABBITMQ_URL ?? 'amqp://quiz_user:quiz_password@localhost:5672',

  // Exchanges
  exchanges: {
    questions: 'questions.exchange',
    deadLetter: 'questions.dlx',
  },

  // Filas
  queues: {
    questionGeneration: 'question.generation.queue',
    questionRetry: 'question.retry.queue',
    questionDeadLetter: 'question.dlq',
  },

  // Routing Keys
  routingKeys: {
    generate: 'question.generate',
    retry: 'question.retry',
    deadLetter: 'question.dead',
  },

  // Configurações de Retry
  retry: {
    maxAttempts: 5, // Aumentado de 3 para 5 com RabbitMQ
    initialDelayMs: 1000, // 1 segundo
    maxDelayMs: 30000, // 30 segundos
    backoffMultiplier: 2, // Delay dobra a cada tentativa
  },

  // Configurações de Consumer
  consumer: {
    prefetchCount: 1, // Processa uma mensagem por vez
    noAck: false, // Requer acknowledgment manual
  },
};

export type RabbitMQConfigType = typeof RabbitMQConfig;
