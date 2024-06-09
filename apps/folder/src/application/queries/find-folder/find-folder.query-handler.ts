import { Folder } from '@common/folder';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { FindFolderQuery } from './find-folder.query';

import { FolderQueryRepository } from '#folder/infrastructure/repositories';

@QueryHandler(FindFolderQuery)
export class FindFolderQueryHandler implements IQueryHandler<FindFolderQuery, Folder> {
  public constructor(private readonly folderRepository: FolderQueryRepository) {}

  public async execute(query: FindFolderQuery): Promise<Folder> {
    return this.folderRepository.findOneOrFail({ _id: query.input.id });
  }
}
