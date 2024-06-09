import { Folder } from '@common/folder';
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdateFolderCommand } from './update-folder.command';

import { FolderCommandRepository } from '#folder/infrastructure/repositories/';

@CommandHandler(UpdateFolderCommand)
export class UpdateFolderCommandHandler implements ICommandHandler<UpdateFolderCommand, Folder> {
  public constructor(private readonly folderRepository: FolderCommandRepository) {}

  private readonly logger = new Logger(UpdateFolderCommandHandler.name);

  public async execute(command: UpdateFolderCommand): Promise<Folder> {
    const { id, ...data } = command.input;
    this.logger.debug(`Start updating folder ${JSON.stringify(command.input)}`);

    const folder = await this.folderRepository.updateOne({ _id: id }, data);

    this.logger.debug(`Folder successfully updated ${JSON.stringify(folder)}`);
    return folder;
  }
}
