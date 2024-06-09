import { IsMongoId } from 'class-validator';

export class FindFolderDto {
  @IsMongoId()
  public id: string;
}
