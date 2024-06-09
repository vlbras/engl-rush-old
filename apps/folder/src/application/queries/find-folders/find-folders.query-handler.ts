import { Folder } from '@common/folder';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { FindFoldersQuery } from './find-folders.query';

import { FolderQueryRepository } from '#folder/infrastructure/repositories';

@QueryHandler(FindFoldersQuery)
export class FindFoldersQueryHandler implements IQueryHandler<FindFoldersQuery, Folder[]> {
  public constructor(private readonly folderRepository: FolderQueryRepository) {}

  public async execute(query: FindFoldersQuery): Promise<Folder[]> {
    return this.folderRepository.findMany(query);
  }
}
