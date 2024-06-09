import { SERVICES } from '@common/core';
import { RabbitMQModule } from '@common/rabbitmq';
import { WordCommandTransporter, WordQueryTransporter } from '@common/word';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [RabbitMQModule.register([SERVICES.WORD])],
  providers: [WordCommandTransporter, WordQueryTransporter],
  exports: [WordCommandTransporter, WordQueryTransporter],
})
export class ApiWordModule {}
