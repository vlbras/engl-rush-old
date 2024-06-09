import { Transform } from 'class-transformer';
import { ArrayMaxSize, ArrayNotEmpty, ArrayUnique, IsAlpha, IsEnum, IsMongoId, Length, Matches } from 'class-validator';

import { WordForms } from '../../enums';

export class CreateWordDto {
  @IsAlpha()
  @Length(1, 24)
  public word: string;

  @Length(1, 24)
  @Matches(/^\p{L}+$/u, {
    message: 'Translation must only contain letters.',
  })
  public translation: string;

  @Length(1, 255)
  @Matches(/^[a-zA-Z0-9 ',.!?]+$/)
  @Transform(({ value }) => transformSentence(value))
  public definition: string;

  @ArrayNotEmpty()
  @ArrayMaxSize(3)
  @Length(1, 255, { each: true })
  @Matches(/^[a-zA-Z0-9 ',.!?]+$/, { each: true })
  @Transform(({ value }) => value.map((v: string) => transformSentence(v)))
  public sentences: string[];

  @ArrayNotEmpty()
  @ArrayMaxSize(Object.keys(WordForms).length)
  @IsEnum(WordForms, { each: true })
  @ArrayUnique()
  public forms: WordForms[];

  @IsMongoId()
  public folderId: string;

  @IsMongoId()
  public userId: string;
}

function transformSentence(value: string): string {
  let newValue = value.charAt(0).toUpperCase() + value.slice(1);
  const lastChar = newValue.charAt(newValue.length - 1);
  if (lastChar !== '.' && lastChar !== '!' && lastChar !== '?') {
    newValue += '.';
  }
  return newValue;
}
