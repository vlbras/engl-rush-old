import { SERVICES } from '@common/core';
import { FolderCommandTransporter, FolderQueryTransporter } from '@common/folder';
import { RabbitMQModule } from '@common/rabbitmq';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [RabbitMQModule.register([SERVICES.FOLDER])],
  providers: [FolderCommandTransporter, FolderQueryTransporter],
  exports: [FolderCommandTransporter, FolderQueryTransporter],
})
export class ApiFolderModule {}
