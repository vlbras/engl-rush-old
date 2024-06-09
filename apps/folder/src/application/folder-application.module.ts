import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import {
  CreateFolderCommandHandler,
  DeleteFolderCommandHandler,
  UpdateFolderCommandHandler,
  FolderCommandFacade,
  DeleteFoldersCommandHandler,
} from './commands';
import { FindFolderQueryHandler, FindFoldersQueryHandler, FolderQueryFacade } from './queries';

import { FolderInfrastructureModule } from '#folder/infrastructure/folder-infrastructure.module';

@Module({
  imports: [CqrsModule.forRoot(), FolderInfrastructureModule],
  providers: [
    FolderCommandFacade,
    FolderQueryFacade,

    /* command handlers */
    CreateFolderCommandHandler,
    UpdateFolderCommandHandler,
    DeleteFolderCommandHandler,
    DeleteFoldersCommandHandler,

    /* query handlers */
    FindFoldersQueryHandler,
    FindFolderQueryHandler,
  ],
  exports: [FolderCommandFacade, FolderQueryFacade],
})
export class FolderApplicationModule {}
