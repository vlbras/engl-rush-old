import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';

import { CreateWordDto } from './create-word.dto';

export class UpdateWordDto extends PartialType(OmitType(CreateWordDto, ['word'])) {
  @IsMongoId()
  public id: string;
}
