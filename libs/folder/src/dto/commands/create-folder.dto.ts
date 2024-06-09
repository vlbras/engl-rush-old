import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateFolderDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsMongoId()
  public userId: string;
}
