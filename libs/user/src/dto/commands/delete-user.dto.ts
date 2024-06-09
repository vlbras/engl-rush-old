import { IsMongoId } from 'class-validator';

export class DeleteUserDto {
  @IsMongoId()
  public id: string;
}
