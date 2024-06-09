import { Folder } from '@common/folder';
import { AbstractMapper } from '@common/mongodb';

import { FolderEntity } from '../entities/folder.entity';

export class FolderMapper extends AbstractMapper<FolderEntity, Folder> {
  public mapEntityToModel(entity: FolderEntity): Folder {
    return {
      id: entity._id.toString(),
      name: entity.name,
      userId: entity.userId,
    };
  }
}
