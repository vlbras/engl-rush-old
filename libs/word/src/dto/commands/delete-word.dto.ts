import { IsMongoId } from 'class-validator';

export class DeleteWordDto {
  @IsMongoId()
  public id: string;
}
