import { MongoDBModule } from '@common/mongodb';
import { Module } from '@nestjs/common';

import { FolderEntity, FolderSchema } from './entities/folder.entity';
import { FolderMapper } from './mappers/folder.mapper';
import { FolderCommandRepository, FolderQueryRepository } from './repositories';

@Module({
  imports: [MongoDBModule.forFeature([{ name: FolderEntity.name, schema: FolderSchema }])],
  providers: [FolderCommandRepository, FolderQueryRepository, FolderMapper],
  exports: [FolderCommandRepository, FolderQueryRepository],
})
export class FolderInfrastructureModule {}
