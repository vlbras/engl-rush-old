import { MongoDBModule } from '@common/mongodb';
import { RabbitMQModule } from '@common/rabbitmq';
import { Module } from '@nestjs/common';

import { FolderApplicationModule } from './application/folder-application.module';
import { FolderCommandController } from './ui/folder-command.controller';
import { FolderEventController } from './ui/folder-event.controller';
import { FolderQueryController } from './ui/folder-query.controller';

@Module({
  imports: [MongoDBModule, RabbitMQModule, FolderApplicationModule],
  controllers: [FolderCommandController, FolderQueryController, FolderEventController],
})
export class FolderModule {}
