import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DeleteFolderCommand } from './delete-folder.command';

import { FolderCommandRepository } from '#folder/infrastructure/repositories';

@CommandHandler(DeleteFolderCommand)
export class DeleteFolderCommandHandler implements ICommandHandler<DeleteFolderCommand, void> {
  public constructor(private readonly folderRepository: FolderCommandRepository) {}

  private readonly logger = new Logger(DeleteFolderCommandHandler.name);

  public async execute(command: DeleteFolderCommand): Promise<void> {
    const { input } = command;
    this.logger.debug(`Start deleting folder ${JSON.stringify(input)}`);

    await this.folderRepository.deleteOne({ _id: input.id });

    this.logger.debug(`Folder successfully deleted ${JSON.stringify(input)}`);
  }
}
