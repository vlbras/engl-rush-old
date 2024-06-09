import { IsMongoId } from 'class-validator';

export class UserExistsDto {
  @IsMongoId()
  public id: string;
}
