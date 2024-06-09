import { Folder } from '@common/folder';
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateFolderCommand } from './create-folder.command';

import { FolderCommandRepository } from '#folder/infrastructure/repositories';

@CommandHandler(CreateFolderCommand)
export class CreateFolderCommandHandler implements ICommandHandler<CreateFolderCommand, Folder> {
  public constructor(private readonly folderRepository: FolderCommandRepository) {}

  private readonly logger = new Logger(CreateFolderCommandHandler.name);

  public async execute(command: CreateFolderCommand): Promise<Folder> {
    this.logger.debug(`Start creating folder ${JSON.stringify(command.input)}`);

    const folder = await this.folderRepository.create(command.input);

    this.logger.debug(`Folder successfully created ${JSON.stringify(folder)}`);
    return folder;
  }
}
