import { ApiProperty } from '@nestjs/swagger';

export class FolderModel {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public userId: string;
}
