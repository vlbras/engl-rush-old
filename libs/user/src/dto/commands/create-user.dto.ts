import { IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public readonly email: string;
}
