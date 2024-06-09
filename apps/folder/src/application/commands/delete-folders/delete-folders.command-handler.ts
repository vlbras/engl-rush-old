import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DeleteFoldersCommand } from './delete-folders.command';

import { FolderCommandRepository } from '#folder/infrastructure/repositories';

@CommandHandler(DeleteFoldersCommand)
export class DeleteFoldersCommandHandler implements ICommandHandler<DeleteFoldersCommand, void> {
  public constructor(private readonly folderRepository: FolderCommandRepository) {}

  private readonly logger = new Logger(DeleteFoldersCommandHandler.name);

  public async execute(command: DeleteFoldersCommand): Promise<void> {
    const { input } = command;
    this.logger.debug(`Start deleting folders ${JSON.stringify(input)}`);

    const deletedCount = await this.folderRepository.deleteMany(input);

    this.logger.debug(`Folders successfully deleted ${JSON.stringify(input)}, amount: ${deletedCount}`);
  }
}
