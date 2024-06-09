import { Folder } from '@common/folder';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateFolderCommand, DeleteFolderCommand, DeleteFoldersCommand, UpdateFolderCommand } from '.';

@Injectable()
export class FolderCommandFacade {
  public constructor(private readonly commandBud: CommandBus) {}

  public async create(command: CreateFolderCommand): Promise<Folder> {
    return this.commandBud.execute(command);
  }

  public async updateOne(command: UpdateFolderCommand): Promise<Folder> {
    return this.commandBud.execute(command);
  }

  public async deleteOne(command: DeleteFolderCommand): Promise<void> {
    return this.commandBud.execute(command);
  }

  public async deleteMany(command: DeleteFoldersCommand): Promise<void> {
    return this.commandBud.execute(command);
  }
}
