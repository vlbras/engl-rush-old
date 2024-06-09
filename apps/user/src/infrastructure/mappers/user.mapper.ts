import { AbstractMapper } from '@common/mongodb';
import { User } from '@common/user';

import { UserEntity } from '../entities/user.entity';

export class UserMapper extends AbstractMapper<UserEntity, User> {
  public mapEntityToModel(entity: UserEntity): User {
    return {
      id: entity._id.toString(),
      email: entity.email,
    };
  }
}
