import { SERVICES } from '@common/core';
import { RabbitMQService } from '@common/rabbitmq';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { FolderModule } from './folder.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(FolderModule);
  const rmqService = app.get(RabbitMQService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.connectMicroservice(rmqService.createConnection({ name: SERVICES.FOLDER }));

  await app.startAllMicroservices();
  await app.init();
}
bootstrap();
