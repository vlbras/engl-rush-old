import { ApiProperty } from '@nestjs/swagger';

export class UserModel {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public email: string;
}
