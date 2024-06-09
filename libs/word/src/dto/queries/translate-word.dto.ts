import { Languages } from '@common/core';
import { Transform } from 'class-transformer';
import { IsAlpha, IsEnum, Length } from 'class-validator';

export class TranslateWordDto {
  @IsAlpha()
  @Length(1, 24)
  @Transform(({ value }) => value.toLowerCase())
  public word: string;

  @IsEnum(Languages)
  public translateTo: Languages;
}
