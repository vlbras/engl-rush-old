import { AbstractEntity } from '@common/mongodb';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'users',
})
export class UserEntity extends AbstractEntity {
  @Prop({
    set: (v: string) => v.toLowerCase(),
  })
  public email: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
