import { IsMongoId } from 'class-validator';

export class DeleteFolderDto {
  @IsMongoId()
  public id: string;
}
