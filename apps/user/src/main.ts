import { SERVICES } from '@common/core';
import { RabbitMQService } from '@common/rabbitmq';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { UserModule } from './user.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(UserModule);
  const rmqService = app.get(RabbitMQService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.connectMicroservice(rmqService.createConnection({ name: SERVICES.USER }));

  await app.startAllMicroservices();
  await app.init();
}
bootstrap();
