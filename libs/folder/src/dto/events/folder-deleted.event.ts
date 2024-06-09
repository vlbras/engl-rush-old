import { IsMongoId } from 'class-validator';

export class FolderDeletedEvent {
  @IsMongoId()
  public folderId: string;
}
