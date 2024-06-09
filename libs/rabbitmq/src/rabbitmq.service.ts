import { SERVICES } from '@common/core';
import { Injectable } from '@nestjs/common';
import { RmqOptions, Transport } from '@nestjs/microservices';

type CreateConnectionConfig = {
  name: SERVICES;
  noAck?: boolean;
};

@Injectable()
export class RabbitMQService {
  public createConnection(config: CreateConnectionConfig): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://rabbitmq:5672'],
        queue: config.name.toString(),
        noAck: config.noAck || true,
      },
    };
  }
}
