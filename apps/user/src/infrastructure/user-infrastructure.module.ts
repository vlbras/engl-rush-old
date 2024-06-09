import { MongoDBModule } from '@common/mongodb';
import { Module } from '@nestjs/common';

import { UserEntity, UserSchema } from './entities/user.entity';
import { UserMapper } from './mappers/user.mapper';
import { UserCommandRepository, UserQueryRepository } from './repositories';

@Module({
  imports: [MongoDBModule.forFeature([{ name: UserEntity.name, schema: UserSchema }])],
  providers: [UserCommandRepository, UserQueryRepository, UserMapper],
  exports: [UserCommandRepository, UserQueryRepository],
})
export class UserInfrastructureModule {}
