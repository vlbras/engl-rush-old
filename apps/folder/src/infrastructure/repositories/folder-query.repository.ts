import { Folder } from '@common/folder';
import { AbstractQueryRepository } from '@common/mongodb';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { FolderEntity } from '../entities/folder.entity';
import { FolderMapper } from '../mappers/folder.mapper';

@Injectable()
export class FolderQueryRepository extends AbstractQueryRepository<FolderEntity, Folder, FolderMapper> {
  public constructor(
    @InjectModel(FolderEntity.name)
    private readonly folderEntity: Model<FolderEntity>,
    private readonly folderMapper: FolderMapper,
  ) {
    super(folderEntity, folderMapper);
  }
}
