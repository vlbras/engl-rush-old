import { SERVICES } from '@common/core';
import { RabbitMQModule } from '@common/rabbitmq';
import { UserCommandTransporter, UserEventTransporter, UserQueryTransporter } from '@common/user';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [RabbitMQModule.register([SERVICES.USER])],
  providers: [UserCommandTransporter, UserQueryTransporter, UserEventTransporter],
  exports: [UserCommandTransporter, UserQueryTransporter, UserEventTransporter],
})
export class ApiUserModule {}
