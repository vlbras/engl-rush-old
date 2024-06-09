import { IsMongoId } from 'class-validator';

export class UserDeletedEvent {
  @IsMongoId()
  public userId: string;
}
