import { Module, forwardRef } from '@nestjs/common';
import {
  RabbitMQConnectionService,
  QuestionQueueService,
  QuestionConsumerService,
  DeadLetterHandlerService,
} from '../messaging';
import { AppModule } from './app.module';

@Module({
  imports: [forwardRef(() => AppModule)],
  providers: [
    RabbitMQConnectionService,
    QuestionQueueService,
    QuestionConsumerService,
    DeadLetterHandlerService,
  ],
  exports: [
    RabbitMQConnectionService,
    QuestionQueueService,
    DeadLetterHandlerService,
  ],
})
export class RabbitMQModule {}
