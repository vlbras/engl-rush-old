import { MongoDBModule } from '@common/mongodb';
import { RabbitMQModule } from '@common/rabbitmq';
import { Module } from '@nestjs/common';

import { UserApplicationModule } from './application/user-application.module';
import { UserCommandController } from './ui/user-command.controller';
import { UserQueryController } from './ui/user-query.controller';

@Module({
  imports: [MongoDBModule, RabbitMQModule, UserApplicationModule],
  controllers: [UserCommandController, UserQueryController],
})
export class UserModule {}
