import { CreateFolderDto, DeleteFolderDto, UpdateFolderDto, Folder, FolderCommandTopics } from '@common/folder';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import {
  CreateFolderCommand,
  DeleteFolderCommand,
  UpdateFolderCommand,
  FolderCommandFacade,
} from '#folder/application/commands';

@Controller()
export class FolderCommandController {
  public constructor(private readonly folderFacade: FolderCommandFacade) {}

  @MessagePattern(FolderCommandTopics.Create)
  public async create(@Payload() payload: CreateFolderDto): Promise<Folder> {
    const command = new CreateFolderCommand(payload);
    return this.folderFacade.create(command);
  }

  @MessagePattern(FolderCommandTopics.UpdateOne)
  public async updateOne(@Payload() payload: UpdateFolderDto): Promise<Folder> {
    const command = new UpdateFolderCommand(payload);
    return this.folderFacade.updateOne(command);
  }

  @MessagePattern(FolderCommandTopics.DeleteOne)
  public async deleteOne(@Payload() payload: DeleteFolderDto): Promise<void> {
    const command = new DeleteFolderCommand(payload);
    await this.folderFacade.deleteOne(command);
  }
}
