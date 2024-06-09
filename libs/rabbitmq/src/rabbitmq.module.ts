import { SERVICES } from '@common/core';
import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { RabbitMQService } from './rabbitmq.service';

@Module({
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {
  public static register(names: SERVICES[]): DynamicModule {
    return {
      module: RabbitMQModule,
      imports: [
        ClientsModule.register({
          clients: names.map(name => ({
            name: name.toString(),
            transport: Transport.RMQ,
            options: {
              urls: ['amqp://rabbitmq:5672'],
              queue: name.toString(),
            },
          })),
          isGlobal: true,
        }),
      ],
      exports: [ClientsModule],
    };
  }
}
