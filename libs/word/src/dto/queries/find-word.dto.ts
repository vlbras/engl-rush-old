import { IsMongoId } from 'class-validator';

export class FindWordDto {
  @IsMongoId()
  public id: string;
}
