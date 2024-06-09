import { IsMongoId } from 'class-validator';

export class FolderExistsDto {
  @IsMongoId()
  public id: string;
}
