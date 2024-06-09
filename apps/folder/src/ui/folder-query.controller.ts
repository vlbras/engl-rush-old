import { FolderQueryTopics, Folder, FindFolderDto } from '@common/folder';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { FindFolderQuery, FindFoldersQuery, FolderQueryFacade } from '#folder/application/queries';

@Controller()
export class FolderQueryController {
  public constructor(private readonly folderFacade: FolderQueryFacade) {}

  @MessagePattern(FolderQueryTopics.FindMany)
  public async findMany(): Promise<Folder[]> {
    const query = new FindFoldersQuery();
    return this.folderFacade.findMany(query);
  }

  @MessagePattern(FolderQueryTopics.FindOne)
  public async findOne(@Payload() payload: FindFolderDto): Promise<Folder> {
    const query = new FindFolderQuery(payload);
    return this.folderFacade.findOne(query);
  }
}
