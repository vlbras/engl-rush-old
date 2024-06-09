import { Folder } from '@common/folder';
import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindFolderQuery, FindFoldersQuery } from '.';

@Injectable()
export class FolderQueryFacade {
  public constructor(private readonly queryBus: QueryBus) {}

  public async findMany(query: FindFoldersQuery): Promise<Folder[]> {
    return this.queryBus.execute(query);
  }

  public async findOne(query: FindFolderQuery): Promise<Folder> {
    return this.queryBus.execute(query);
  }
}
