import { AbstractEntity } from '@common/mongodb';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class FolderEntity extends AbstractEntity {
  @Prop({
    trim: true,
  })
  public name: string;

  @Prop()
  public userId: string;
}

export const FolderSchema = SchemaFactory.createForClass(FolderEntity);
