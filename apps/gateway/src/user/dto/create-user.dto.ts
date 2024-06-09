import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  public readonly email: string;
}
