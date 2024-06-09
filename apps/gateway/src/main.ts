import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { GatewayModule } from './gateway.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(GatewayModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const documentOptions = new DocumentBuilder()
    .setTitle('EnglRush API')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, documentOptions);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
