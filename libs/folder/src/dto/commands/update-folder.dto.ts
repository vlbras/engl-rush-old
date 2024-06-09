import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';

import { CreateFolderDto } from './create-folder.dto';

export class UpdateFolderDto extends PartialType(CreateFolderDto) {
  @IsMongoId()
  public id: string;
}
